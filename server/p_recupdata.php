<?php include_once('./connection.php');

header('Content-Type: text/html; charset=utf-8');

$result= array();

// Récupération en base des infos liées aux plantes;
$plantes = $bdd->query("SELECT * FROM `".$TABLE_PLANT."` ORDER BY LOWER(nom);")or die(print_r($bdd->errorInfo()));
$recoltes = $bdd->query("SELECT * FROM `".$TABLE_HARVEST."` ;")or die(print_r($bdd->errorInfo()));
$compagnonnages = $bdd->query("SELECT * FROM `".$TABLE_NEIGHBOUR."` ;")or die(print_r($bdd->errorInfo()));

$result_harvest = array();
$result_neighbours = array();

// récupération des infos de récolte par plante
while ($harvest = $recoltes->fetch()) {
  $id = $harvest['IDPlante'];
  $comestible = $harvest['comestible'];
  $start = $harvest['recolteDeb'];
  $end = $harvest['recolteFin'];
  if (!array_key_exists($id, $result_harvest)) {
    $result_harvest[$id] = array();
  }
  $result_harvest[$id][$comestible] = [$start, $end];
}

// récupération des infos de compagnonnage par plante
while ($neighbour = $compagnonnages->fetch()) {
  $id1 = $neighbour['IDPlante1'];
  $id2 = $neighbour['IDPlante2'];
  $quality = $neighbour['qualite'];
  if (!array_key_exists($id1, $result_neighbours)) {
    $result_neighbours[$id1] = array_fill_keys(['0', '1'], array());
  }
  if (!array_key_exists($id2, $result_neighbours)) {
    $result_neighbours[$id2] = array_fill_keys(['0', '1'], array());
  }
  array_push($result_neighbours[$id1][$quality], $id2);
  array_push($result_neighbours[$id2][$quality], $id1);
}

// pour chaque plante, on construit un objet contenant toutes les infos
while ($plante = $plantes->fetch()){
  $result[$plante['ID']]=[];
  foreach ($plante as $key => $value){
  	$result[$plante['ID']][$key]=$value;
  }
  $result[$plante['ID']]['multi'] = split('_', $result[$plante['ID']]['multi']);
  $result[$plante['ID']]['utilisation'] = split('_', $result[$plante['ID']]['utilisation']);
  $result[$plante['ID']]['usagemedic'] = split('_', $result[$plante['ID']]['usagemedic']);

  $result[$plante['ID']]['type'] = array_keys($result_harvest[$plante['ID']]);
  $result[$plante['ID']]['recolte'] = $result_harvest[$plante['ID']];
  $result[$plante['ID']]['associe'] = $result_neighbours[$plante['ID']]['1'];
  $result[$plante['ID']]['antiassocie'] = $result_neighbours[$plante['ID']]['0'];
}

$compagnonnages->closeCursor();
$recoltes->closeCursor();
$plantes->closeCursor();

echo json_encode($result);
mysql_close();


	//INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`) VALUES (NULL, 'Aubergine', '1', '50', '50', '2', '3', '4', '4', '7', '10', '1', '1', '2', '1', '2', '40', '20', 'fruit', '3', '', 'semis', '0', 'solanacée', '0'),(autres);
	//INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`) VALUES (NULL, 'Aubergine', '1', '2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''), (NULL, 'hree', '', '', '', '', '', '', '', '', '', '', '', '', '5', '', '', '', '', '', '', '', '', '', '');
	//<script>plante=<?php echo json_encode($d);
?>
