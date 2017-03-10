<?php include_once('./connection.php');

header('Content-Type: text/html; charset=utf-8');

$data = json_decode($_POST['data']);
$data = json_decode(json_encode($data), true);

$plantId = $data['ID'];

// Iteration sur les paires (cle;valeur) du dictionnaire de données
$pairs = array();

foreach($data as $key => $value){
	if ($key == 'ID') {
		break;
	}
	array_push($columns, $key);
	$value=(is_null($value) ? 0 : $value);
	if (is_array($value)){
		$value = join('_', $value);
		$value = (count($value) > 0) ? '_'.$value.'_' : $value;
	}
	$pairs[$key] = $value;
}

// Preparation chaine d'insertion de données dans la table temporaire
$sql = "UPDATE `".$DB."`.`".$TABLE_PLANT."` SET ";
foreach($pairs as $column => $value) {
	// TODO: pour supprimer les champs suivants du frontend JS
	if (!(in_array($column, ['type', 'associe', 'antiassocie', 'nomlatin']))) {
		$sql = $sql."`".$column."`=:".$column.",";
	}
}
$sql=substr($sql,0,-1); // On enleve la derniere virgule
$sql = $sql." WHERE `ID`='".$plantId."';";

$statement = $bdd->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$statement->execute($pairs);

// Préparation insertion dans table recolte
$harvestQueries = array();
$sql = "DELETE FROM `".$DB."`.`".$TABLE_HARVEST."` WHERE `IdPlante`='".$plantId."';";
array_push($harvestQueries, $sql);
foreach($data['type'] as $typeComestible) {
	$data['recolteDeb'] = ($data['recolteDeb'] != NULL) ? $data['recolteDeb'] : 0;
	$data['recolteFin'] = ($data['recolteFin'] != NULL) ? $data['recolteFin'] : 0;
	$sql = "INSERT INTO `".$DB."`.`".$TABLE_HARVEST."` (`IDComestible`, `IDPlante`, `comestible`, `recolteDeb`, `recolteFin`) VALUES ";
	$sql = $sql."(NULL, ".$plantId.", ".$typeComestible.", ".$data['recolteDeb'].", ".$data['recolteFin'].");";
	array_push($harvestQueries, $sql);
}

// Préparation insertion dans table compagnonnages
$neighbourQueries = array();
$sql = "DELETE FROM `".$DB."`.`".$TABLE_NEIGHBOUR."` WHERE `IdPlante1`='".$plantId."' OR `IdPlante2`='".$plantId."';";
array_push($neighbourQueries, $sql);

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



/*
$sqlf ="UPDATE `".$DB."`.`".$_GET['table']."` SET ";
$champs=$_GET['titres'];
//echo $champs;

foreach($champs as $k){
	$sqlf .='`'.$k.'`';
	if(isset($_GET[$k])){
			$sqlf.="='".$_GET[$k]."',";
	}
}
$sqlf2=substr($sqlf,0,-1);
$sqlf2 .=" WHERE `ID`='".$_GET['ID']."';";
//echo $sql2;

echo $sqlf2;

$sql = $bdd->query($sqlf2)or die(print_r($bdd->errorInfo()));

		$sql->closeCursor();
	//print_r($pl);

	 mysql_close();
*/



	//INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`) VALUES (NULL, 'Aubergine', '1', '50', '50', '2', '3', '4', '4', '7', '10', '1', '1', '2', '1', '2', '40', '20', 'fruit', '3', '', 'semis', '0', 'solanacée', '0'),(autres);
	//INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`) VALUES (NULL, 'Aubergine', '1', '2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''), (NULL, 'hree', '', '', '', '', '', '', '', '', '', '', '', '', '5', '', '', '', '', '', '', '', '', '', '');
	//<script>plante=<?php echo json_encode($d);
	//INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`, `tpslevee`, `rendement`, `tpsconserv`, `associe`, `antiassocie`, `utilisation`, `conservalimt`) VALUES (NULL, 'houblon', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', '', '', '', '', ''), (NULL, 'hierba buena', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', '', '', '', '', '');


		?>
