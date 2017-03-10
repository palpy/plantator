<?php include_once('../connection.php');

/* Script à exécuter une fois que la migration a été faite et vérifiée */

header('Content-Type: text/html; charset=utf-8');

/* REQUETE ALTER TABLE plante *************************************/

// retirer champ type, associe, antiassocie de table plante

$alterTableQuery = "ALTER TABLE ".$TABLE_PLANT." DROP `type`, DROP `associe`, DROP `antiassocie`, DROP `nomlatin`;";
// $sql = $bdd->query($alterTableQuery) or die(print_r($bdd->errorInfo()));
// $sql->closeCursor();
echo nl2br($alterTableQuery."\n");

// champ de type int : 0 => NULL (sauf pour les températures, encore que ?) ???
// champ de type choice (entier en base) : 0 => NULL (sauf pour vivace où faut décaler les valeurs ?) ??

?>
