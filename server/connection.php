<?php

$DB = 'plante';
$TABLE_PLANT = "plante2";
$TABLE_TEMP = "planteTemp";
$TABLE_NEIGHBOUR = "compagnonnage";
$TABLE_HARVEST = "recolte";
$TABLE_GARDEN = "potager";

header('Content-Type: text/html; charset=utf-8');

$bdd = new PDO("mysql:host=localhost;dbname=".$DB, 'root', '');

mysql_query("SET NAMES UTF8");
mysql_set_charset( 'utf8' );

?>
