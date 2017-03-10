<?php include_once('../server/connection.php');

/* Script à exécuter pour ajuster valeurs champ usagemedic / utilisation pour filtre */

header('Content-Type: text/html; charset=utf-8');

$sql = $bdd->query("UPDATE ".$TABLE_PLANT." SET usagemedic = Concat('_', usagemedic);")or die(print_r($bdd->errorInfo()));

$sql = $bdd->query("UPDATE ".$TABLE_PLANT." SET utilisation = Concat('_', utilisation);")or die(print_r($bdd->errorInfo()));

$sql->closeCursor();

mysql_close();

?>
