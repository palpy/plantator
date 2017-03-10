<?php include_once('../connection.php');

/* Script à exécuter pour modifier la base de données (décommenter lignes vers bas du fichier pour application) */

header('Content-Type: text/html; charset=utf-8');

$TYPE_CONVERTER = ['', 'feuille', 'fruit', 'fleur', 'racine', 'tige/sève'];

// Tableau stockant les requetes SQL à exécuter
$queries = array();

$neighbours = array();

$plantes = $bdd->query("SELECT * FROM ".$TABLE_PLANT." ;")or die(print_r($bdd->errorInfo()));
while ($entry = $plantes->fetch()) {

  /* REQUETE UPDATE  *************************************************/

  // champ vivace -> decaler valeurs OK
  // champ nomlatin -> inserer entree pour alimenter genre et espece OK
  // champ type : changer chaine en entiers correspondants OK

  // décale valeur vivace
  $newVivace = intval($entry['vivace']) + 1;

  // crée entrées genre et espece
  $genre = $espece = NULL;
  $nomlatinArray = split(' ', $entry['nomlatin']);
  if (count($nomlatinArray) > 0) {
    $genre = $nomlatinArray[0];
    $espece = $nomlatinArray[1];
  }

  // change champ type en liste d'entiers
  $types = split('_', $entry['type']);
  $types_converted = array();
  foreach ($types as $type) {
    if ($type != '') {
      if (!is_int($type)) {
        array_push($types_converted, array_search($type, $TYPE_CONVERTER));
      } else {
        array_push($types_converted, $type);
      }
    }
  }
  $type = join('_', $types_converted);

  $updateInfosQuery = "UPDATE ".$TABLE_PLANT." SET vivace='".$newVivace."', genre='".$genre. "', espece='".$espece."', type='".$type."' WHERE ID=".$entry['ID'].";";
  //echo nl2br ($entry['nom']." : ".$updateInfosQuery."\n\n");
  array_push($queries, $updateInfosQuery);


  /* REQUETE INSERT INTO dans recolte *************************************/

  // pour chaque valeur dans champ, inserer une entree dans le dictionnaire recolte qui alimentera la table éponyme
  // recolte : nouvelle table recolte (IDPlante, comestible, recolteDeb, recolteFin)

  foreach ($types_converted as $type) {
    $insertHarvestQuery = "INSERT INTO ".$TABLE_HARVEST." (`IdComestible`, `IdPlante`, `comestible`, `recolteDeb`, `recolteFin`) VALUES (NULL,'".$entry['ID']."','".$type."','".$entry['recolteDeb']. "','".$entry['recolteFin']."');";
    //echo nl2br ($entry['nom']." : ".$insertHarvestQuery."\n\n");
    array_push($queries, $insertHarvestQuery);
  }

  /* Préparation REQUETE INSERT INTO dans compagnonnage *************************************/

  // pour chaque valeur dans champ, inserer une entree dans dictionnaire compagnonnage qui alimentera la table éponyme
  // attention : vérifier que paire de plantes n'est pas deja déclarée dans le dictionnair

  foreach (split('_', $entry['associe']) as $associe) {
    if ($associe != '' && $entry['ID'] != $associe) {
      $key = (intval($entry['ID']) < intval($associe)) ? $entry['ID']."_".$associe : $associe."_".$entry['ID'];
      if (!array_key_exists($key, $neighbours)) {
        $neighbours[$key] = true;
      }
    }
  }

  foreach (split('_', $entry['antiassocie']) as $antiassocie) {
    if ($antiassocie != '' && $entry['ID'] != $antiassocie) {
      $key = (intval($entry['ID']) < intval($antiassocie)) ? $entry['ID']."_".$antiassocie : $antiassocie."_".$entry['ID'];
      if (!array_key_exists($key, $neighbours)) {
        $neighbours[$key] = false;
      }
    }
  }

}


/* Préparation REQUETE INSERT INTO dans compagnonnage *************************************/

// compagnonnage : nouvelle table compagnons (IDPlante1, IDPlante2, qualité)

foreach ($neighbours as $key => $quality) {
  $ids = split('_', $key);
  $quality = ($quality) ? '1': '0';
  $insertNeighbourQuery = "INSERT INTO ".$TABLE_NEIGHBOUR." (`IDPlante1`, `IDPlante2`, `qualite`) VALUES ('".$ids[0]."','".$ids[1]."','".$quality."');";
  array_push($queries, $insertNeighbourQuery);
}


/* Affichage de toutes les requêtes avant application **************************************/

foreach ($queries as $query) {
  echo nl2br($query."\n");
  // ATTENTION : POUR APPLIQUER CHANGEMENTS EN BASE, DECOMMENTER LA LIGNE SUIVANTE
  // $sql = $bdd->query($query) or die(print_r($bdd->errorInfo()));
}
$sql->closeCursor();

mysql_close();

?>
