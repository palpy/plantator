<?php include_once('./connection.php');

header('Content-Type: text/html; charset=utf-8');

$date = date('Y-m-d-H:i:s', time());

// Insertion dans la table temporaire des infos de la plante sous forme d'un JSON sérializé
$query = "INSERT INTO `".$TABLE_TEMP."` (date, content) VALUES(CAST(:date AS DATETIME), :data);";
$statement = $bdd->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$statement->execute(array(':date' => $date, ':data' => $_POST['data']));

mysql_close();

//INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`) VALUES (NULL, 'Aubergine', '1', '50', '50', '2', '3', '4', '4', '7', '10', '1', '1', '2', '1', '2', '40', '20', 'fruit', '3', '', 'semis', '0', 'solanacée', '0'),(autres);
//INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`) VALUES (NULL, 'Aubergine', '1', '2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''), (NULL, 'hree', '', '', '', '', '', '', '', '', '', '', '', '', '5', '', '', '', '', '', '', '', '', '', '');
//<script>plante=<?php echo json_encode($d);

?>
