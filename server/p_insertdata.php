<?php include_once('./connection.php');

header('Content-Type: text/html; charset=utf-8');

$data = json_decode($_POST['data']);
$data = json_decode(json_encode($data), true);

// Iteration sur les paires (cle;valeur) du dictionnaire de données
$columns = array();
$values = array();

foreach($data as $key => $value){
	// TODO: pour supprimer les champs suivants du frontend JS
	if (!(in_array($key, ['type', 'associe', 'antiassocie', 'nomlatin']))) {
		array_push($columns, $key);
		$value=(is_null($value) ? 0 : $value);
		if (is_array($value)){
			$value = join('_', $value);
			$value = (count($value) > 0) ? '_'.$value.'_' : $value;
		}
		$values[$key] = $value;
	}
}

// Preparation chaine d'insertion de données dans la table temporaire
$sql = "INSERT INTO `".$DB."`.`".$TABLE_PLANT."` (";
foreach($columns as $column) {
	$sql = $sql.'`'.$column.'`,';
}
$sql=substr($sql,0,-1); // On enleve la derniere virgule

$sql = $sql.") VALUES (";
foreach($columns as $column) {
	$sql = $sql.":".$column.",";
}
$sql=substr($sql,0,-1); // On enleve la derniere virgule
$sql = $sql.")";

$statement = $bdd->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$statement->execute($values);


$plantId = $bdd->lastInsertId();

// Préparation insertion dans table recolte
$harvestQueries = array();
foreach($data['type'] as $typeComestible) {
	$sql = "INSERT INTO `".$DB."`.`".$TABLE_HARVEST."` (`IDComestible`, `IDPlante`, `comestible`, `recolteDeb`, `recolteFin`) VALUES ";
	$sql = $sql."(NULL, ".$plantId.", ".$typeComestible.", ".$data['recolteDeb'].", ".$data['recolteFin'].");";
	array_push($harvestQueries, $sql);
}


// Préparation insertion dans table compagnonnages
$neighbourQueries = array();
foreach($data['associe'] as $goodNeighbourId) {
	$plantId1 = ($plantId < $goodNeighbourId) ? $plantId : $goodNeighbourId;
	$plantId2 = ($plantId < $goodNeighbourId) ? $goodNeighbourId : $plantId;
	$sql = "INSERT INTO `".$DB."`.`".$TABLE_NEIGHBOUR."` (`IDPlante1`, `IDPlante2`, `qualite`) VALUES ";
	$sql = $sql."(".$plantId1.", ".$plantId2.", 1);";
	array_push($neighbourQueries, $sql);
}

foreach($data['antiassocie'] as $badNeighbourId) {
	$plantId1 = ($plantId < $badNeighbourId) ? $plantId : $badNeighbourId;
	$plantId2 = ($plantId < $badNeighbourId) ? $badNeighbourId : $plantId;
	$sql = "INSERT INTO `".$DB."`.`".$TABLE_NEIGHBOUR."` (`IDPlante1`, `IDPlante2`, `qualite`) VALUES ";
	$sql = $sql."(".$plantId1.", ".$plantId2.", 0);";
	array_push($neighbourQueries, $sql);
}

// Exécution des requêtes
foreach($harvestQueries as $sql) {
	$sql = $bdd->query($sql)or die(print_r($bdd->errorInfo()));
	$sql->closeCursor();
}
foreach($neighbourQueries as $sql) {
	$sql = $bdd->query($sql)or die(print_r($bdd->errorInfo()));
	$sql->closeCursor();
}

mysql_close();

//INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`) VALUES (NULL, 'Aubergine', '1', '50', '50', '2', '3', '4', '4', '7', '10', '1', '1', '2', '1', '2', '40', '20', 'fruit', '3', '', 'semis', '0', 'solanacée', '0'),(autres);
//INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`) VALUES (NULL, 'Aubergine', '1', '2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''), (NULL, 'hree', '', '', '', '', '', '', '', '', '', '', '', '', '5', '', '', '', '', '', '', '', '', '', '');
//<script>plante=<?php echo json_encode($d);
//INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`, `tpslevee`, `rendement`, `tpsconserv`, `associe`, `antiassocie`, `utilisation`, `conservalimt`) VALUES (NULL, 'houblon', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', '', '', '', '', ''), (NULL, 'hierba buena', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', '', '', '', '', '');
?>
