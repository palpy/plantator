<?php include_once('../manuel/connexionmysql.php');

header('Content-Type: text/html; charset=utf-8');
$sqlfinal ="INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`,`tpslevee`,`rendement`,`tpsconserv`,`associe`,`antiassocie`,`utilisation`,`conservalimt`) VALUES (NULL, 'ail', '', '', '', '', '', '1', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'liliacée', '', '', '', '', '', '', '', '5'),(NULL, 'ail des ours', '', '', '', '', '', '7', '', '3', '6', '3', '3', '', '', '1', '0 4', 'feuille', '', 'bulbe et fleurs comestibles', 'division', '', '', 'liliacée', '', '', '', '', '', '', '', ''),(NULL, 'artichaut', '', '', '', '', '', '3', '', '8', '10', '3', '', '', '1', '', '', '', 'fruit', '', '', 'rejet', '', 'asteracée', '1', '', '0 5', '', '', '', '', ''),(NULL, 'asperge', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', ''),(NULL, 'aubergines', '1', '50', '50', '2', '3', '4', '4', '7', '10', '', '1', '', '', '', '', '', 'fruit', '', '', '', '', 'solanacée', '0', '', '', '', '', '', '', ''),(NULL, 'avoine', '', '', '', '', '', '9', '', '7', '8', '1', '2', '1', '', '1', '60', '20', 'fruit', '3', 'facile à récolter', '', '', 'poacée', '', '', '', '', '', '', '', ''),(NULL, 'betteraves', '2', '30', '35', '', '', '3', '', '7', '11', '', '', '', '', '', '', '', 'racine', '', '', '', '', '', '', '', '', '', '', '', '', ''),(NULL, 'ble dur', '2', '12', '3', '', '', '8', '', '8', '9', '1', '', '', '', '', '100', '', 'fruit', '', '', '', '', 'poacée', '', '', '', '', '', '', '', ''),(NULL, 'ble tendre', '2', '12', '3', '', '', '8', '', '7', '8', '1', '', '', '', '', '100', '', 'fruit', '', '', '', '', 'poacée', '', '', '', '', '', '', '', ''),(NULL, 'bourrache', '', '', '', '', '', '3', '', '3', '11', '2', '1', '', '', '', '45', '50', 'feuille', '', '', '', '', 'boraginacées', '1', '', '', '', '', '', '', ''),(NULL, 'capucine tubereuse', '10', '100', '100', '', '', '4', '', '9', '12', '', '1', '', '1', '1', '', '', 'feuille', '', 'racine comestible et productive', '', '', '', '1', '', '', '', '', '', '', ''),(NULL, 'ble', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'poacée', '', '', '', '', '', '', '', ''),(NULL, 'cardons', '2', '30', '30', '', '', '4', '', '9', '11', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'asteracée', '', '', '', '', '', '', '', ''),(NULL, 'carottes printemps', '1', '20', '5', '', '2', '', '', '6', '7', '', '', '', '1', '', '', '', 'racine', '', '', '', '', 'apiacée', '', '', '', '', '', '', '', ''),(NULL, 'carottes ete', '1', '20', '5', '', '', '3', '', '7', '12', '', '', '', '1', '', '', '', 'racine', '', '', '', '', 'apiacée', '', '', '', '', '', '', '', ''),(NULL, 'carottes hiver', '1', '20', '5', '', '11', '', '', '5', '6', '', '', '', '1', '', '', '', 'racine', '', '', '', '', 'apiacée', '', '', '', '', '', '', '', ''),(NULL, 'céleris-raves', '1', '40', '40', '2', '2', '5', '4', '10', '11', '', '', '', '', '', '', '', 'racine', '', '', '', '', 'apiacée', '', '', '', '', '', '', '', ''),(NULL, 'céleris à côtes', '1', '30', '30', '2', '4', '', '7', '8', '10', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'asteracée', '', '', '', '', '', '', '', ''),(NULL, 'céleris à couper', '1', '20', '20', '', '4', '', '6', '7', '10', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'asteracée', '', '', '', '', '', '', '', ''),(NULL, 'chenopode de bon henri', '', '', '40', '', '', '3', '', '4', '10', '4', '', '', '', '', '', '', 'feuille', '', 'prendre les feuilles basses', 'division au printemps', '', 'asteracée', '1', '', '', '', '', '', '', ''),(NULL, 'chicorées frisées et scaroles', '1', '30', '30', '', '2', '', '3', '5', '12', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'asteracée', '', '', '', '', '', '', '', ''),(NULL, 'chicorées witloof endives ', '1', '30', '10', '', '', '5', '10', '10', '2', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'asteracée', '', '', '', '', '', '', '', ''),(NULL, 'choux d été d automne et d hiver cabus de milan rouge ', '2', '50', '50', '', '2', '', '4', '6', '3', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'choux de printemps cabus ', '2', '40', '40', '', '8', '', '10', '4', '6', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'chou kale', '', '25', '25', '', '', '3', '', '10', '5', '4', '2', '', '', '', '', '', 'feuille', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'chou daubenton', '', '50', '50', '', '', '3', '', '10', '5', '4', '2', '', '', '2', '100', '', 'feuille', '', '', '', '', 'brassicacée', '1', '', '', '', '', '', '', ''),(NULL, 'choux-fleurs', '2', '60', '60', '3', '', '', '6', '7', '12', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'chou-fleurs d hiver', '2', '60', '60', '5', '', '7', '5', '3', '6', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'choux brocolis', '2', '60', '60', '', '', '5', '6', '10', '5', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'brocoli nine star', '', '', '90', '', '', '', '', '', '', '', '1', '2', '2', '3', '100', '', 'fleur', '', 'meurt si on le laisse monter en graine', '', '', 'brassicacée', '1', '', '', '', '', '', '', ''),(NULL, 'choux de bruxelles', '2', '50', '50', '', '3', '', '5', '10', '2', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'ciboule de chine', '', '40', '20', '2', '', '4', '', '3', '11', '', '2', '', '2', '', '50', '', 'feuille', '', '', 'division', '', 'liliacée', '1', '', '', '', '', '', '', ''),(NULL, 'claytone de cuba', '1', '', '25', '', '', '3', '', '6', '3', '1', '1', '1', '1', '', '', '', 'fruit', '', '', 'se resseme spontanément', '', '', '', '', '', '', '', '', '', ''),(NULL, 'concombres cornichons', '3', '100', '100', '3', '', '4', '4', '6', '10', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'cucurbitacée', '0', '', '', '', '', '', '', ''),(NULL, 'consoude', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'feuille', '', '', '', '', '', '', '', '', '', '', '', '', ''),(NULL, 'courge butternut', '', '230', '200', '', '3', '5', '', '9', '12', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'cucurbitacée', '0', '', '', '', '', '', '', ''),(NULL, 'courgettes', '2', '70', '60', '4', '', '5', '5', '7', '11', '', '', '', '', '', '', '', 'feuille_fleur', '', '', '', '', 'cucurbitacée', '', '', '', '', '', '', '', ''),(NULL, 'crambe maritime', '', '50', '50', '', '', '3', '', '10', '5', '20', '1', '3', '1', '', '', '', 'feuille', '', '', '', '', 'brassicacée', '1', '', '', '', '', '', '', ''),(NULL, 'cresson de jardin', '', '', '20', '', '', '3', '', '7', '11', '2', '2', '', '', '', '30', '', 'feuille', 'pivot', '', 'se resseme spontanément', '', '', '1', '', '', '', '', '', '', ''),(NULL, 'epeautre', '', '', '', '', '', '11', '', '7', '8', '', '', '', '', '2', '110', '', 'fruit', '', '', '', '', 'poacée', '', '', '', '', '', '', '', ''),(NULL, 'épinards hiver ', '1', '29', '9', '', '', '8', '', '10', '4', '', '', '', '', '', '', '', 'feuille', '', '', '', '', '', '', '', '', '', '', '', '', ''),(NULL, 'épinards été ', '2', '30', '10', '', '', '2', '', '5', '6', '', '', '', '', '', '', '', 'feuille', '', '', '', '', '', '', '', '', '', '', '', '', ''),(NULL, 'fenouils', '1', '40', '10', '', '', '4', '5', '8', '10', '', '', '', '', '', '', '', 'racine', '', '', '', '', 'apiacée', '', '', '', '', '', '', '', ''),(NULL, 'fèves été ', '2', '29', '9', '', '', '2', '', '5', '6', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'fabacée', '', '', '', '', '', '', '', ''),(NULL, 'fèves printemps ', '3', '30', '10', '', '', '10', '', '3', '5', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'fabacée', '', '', '', '', '', '', '', ''),(NULL, 'fraisier', '', '35', '27', '', '', '3', '', '5', '10', '3', '', '', '', '', '', '', 'fruit', '', 'remontante :mara des bois cirafine cijosé charlotte', '', '', 'rosacée', '1', '', '', '', '', '', '', ''),(NULL, 'groseiller', '', '3', '1', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'grossulariacées', '', '', '1', '', '', '', '', ''),(NULL, 'haricots nains à filets mangetout', '3', '5', '40', '', '', '4', '', '6', '10', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'fabacée', '', '', '', '', '', '', '', ''),(NULL, 'haricots à rames à filets mangetout', '3', '40', '70', '', '4', '', '', '6', '10', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'fabacée', '', '', '', '', '', '', '', ''),(NULL, 'haricots à écosser récolte en grains frais', '3', '40', '40', '', '', '4', '', '7', '10', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'fabacée', '', '', '', '', '', '', '', ''),(NULL, 'haricots à écosser récolte en grains secs', '3', '30', '40', '', '', '4', '', '9', '10', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'fabacée', '', '', '', '', '', '', '', ''),(NULL, 'houblon', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),(NULL, 'kiwi', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'bouture semis', '', '', '', '', '1 5', '', '', '', '', ''),(NULL, 'laitues à forcer', '1', '30', '20', '11', '', '', '2', '3', '5', '', '', '', '', '', '', '', 'feuile', '', '', '', '', 'asteracée', '', '', '', '', '', '', '', ''),(NULL, 'laitues de printemps', '1', '30', '20', '', '3', '', '4', '5', '6', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'asteracée', '', '', '', '', '', '', '', ''),(NULL, 'laitues d été', '1', '30', '20', '', '', '4', '6', '7', '9', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'asteracée', '', '', '', '', '', '', '', ''),(NULL, 'laitues d automne', '1', '30', '20', '', '', '7', '8', '9', '10', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'asteracée', '', '', '', '', '', '', '', ''),(NULL, 'laitues d hiver', '1', '30', '20', '', '', '8', '10', '3', '5', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'asteracée', '', '', '', '', '', '', '', ''),(NULL, 'laitues à couper', '1', '20', '15', '', '', '3', '', '4', '10', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'asteracée', '', '', '', '', '', '', '', ''),(NULL, 'liane de madere', '', '', '', '', '', '3', '', '', '', '5', '2', '', '3', '', '600', '', 'racine_feuille', '', '', '', '-1', '', '1', '', '', '', '', '', '', ''),(NULL, 'lin', '', '15', '', '', '', '3', '', '7', '8', '', '', '', '', '1', '', '', '', '', 'éloigne les doryphores?semer serré pour les fibres', '', '', 'linacée', '', '', '', '', '', '', '', ''),(NULL, 'lupin', '3', '15', '', '', '', '3', '', '8', '9', '', '', '', '3', '1', '100', '', '', '', '', '', '', 'fabacée', '', '', '0 3', '', '', '', '', ''),(NULL, 'luzerne', '', '', '', '', '', '8', '', '5', '11', '', '', '', '', '', '50', '', '', '', 'pour paillage jusqu à 4 coupes/an avant floraison', 'semis spontané', '', 'fabacée', '1', '', '', '', '', '', '', ''),(NULL, 'mâches', '1', '20', '5', '', '', '7', '', '9', '3', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'valérianacée', '1', '', '', '', '', '', '', ''),(NULL, 'maïs', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'poacée', '', '', '', '', '', '', '', ''),(NULL, 'melons', '2', '80', '80', '2', '', '', '4', '7', '9', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'cucurbitacée', '', '', '', '', '', '', '', ''),(NULL, 'millet', '1', '', '15', '', '', '4', '', '8', '9', '', '1', '', '1', '', '100', '30', 'fruit', '', 'variété à grappesplus productives', '', '', 'poacée', '', '', '', '', '', '', '', ''),(NULL, 'moutarde', '2', '', '', '', '', '8', '', '6', '10', '', '', '', '', '1', '60', '', 'fruit', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'navets de printemps', '1', '20', '10', '', '', '3', '', '5', '7', '', '', '', '', '', '', '', 'racine', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'navets d automne', '1', '20', '10', '', '', '7', '', '9', '11', '', '', '', '', '', '', '', 'racine', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'oignons blancs à confire', '2', '20', '5', '', '', '2', '', '6', '9', '', '', '', '', '', '', '', 'racine', '', '', '', '', 'liliacée', '', '', '', '', '', '', '', ''),(NULL, 'oignons blancs', '2', '20', '5', '', '', '8', '10', '4', '6', '', '', '', '', '', '', '', 'racine', '', '', '', '', 'liliacée', '', '', '', '', '', '', '', ''),(NULL, 'oignons de couleur automne', '2', '20', '5', '', '', '2', '', '7', '9', '2', '', '', '', '', '', '', 'racine', '', '', '', '', 'liliacée', '', '', '', '', '', '', '', ''),(NULL, 'oignons de couleur printemps', '2', '20', '5', '', '', '8', '', '4', '5', '', '', '', '', '', '', '', 'racine', '', '', '', '', 'liliacée', '', '', '', '', '', '', '', ''),(NULL, 'oignons rocambole', '', '3', '', '', '', '2', '', '7', '11', '4', '1', '2', '3', '3', '50', '', 'racine', '', '', 'division ou plantation bulbilles', '', 'liliacée', '1', '', '', '', '', '', '', ''),(NULL, 'orge', '2', '13', '13', '', '', '10', '', '7', '', '1', '', '', '', '', '70', '', '', '', '', '', '', 'poacée', '', '', '', '', '', '', '', ''),(NULL, 'oseille epinard', '', '', '30', '', '', '4', '', '5', '10', '4', '2', '2', '3', '', '150', '', 'feuille', '', '', '', '', 'polygonacée', '', '', '', '', '', '', '', ''),(NULL, 'oseilles', '1', '20', '15', '', '', '3', '', '5', '11', '1', '', '', '', '', '', '', 'feuille', '', '', '', '', 'polygonacée', '', '', '', '', '', '', '', ''),(NULL, 'panais', '1', '30', '20', '', '', '2', '', '5', '9', '', '', '', '', '', '', '', 'racine', '', '', '', '', 'apiacée', '', '', '', '', '', '', '', ''),(NULL, 'poire de terre', '', '', '150', '', '', '5', '', '10', '11', '1', '1', '', '1', '', '150', '', 'racine', '', 'polymnia', '', '', 'asteracée', '', '', '', '', '', '', '', ''),(NULL, 'poireau perpetuel', '', '', '', '', '', '9', '', '9', '6', '', '1', '3', '1', '3', '', '', 'feuille', '', '', 'division', '', 'liliacée', '1', '', '', '', '', '', '', ''),(NULL, 'poireaux d été', '1', '30', '10', '', '2', '', '5', '7', '9', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'liliacée', '', '', '', '', '', '', '', ''),(NULL, 'poireaux d automne et d hiver', '1', '30', '10', '', '3', '', '5', '10', '4', '', '', '', '', '', '', '', 'feuille', '', '', '', '', 'liliacée', '', '', '', '', '', '', '', ''),(NULL, 'poirées blettes bettes ', '1', '40', '30', '', '', '4', '', '7', '11', '2', '1', '5', '', '3', '', '', 'feuille', '', 'mulcher pendant les gelées', '', '', 'chenopodiacée', '1', '', '', '', '', '', '', ''),(NULL, 'pois à grain rond et mangetout', '3', '40', '20', '', '', '2', '', '6', '7', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'fabacée', '', '', '', '', '', '', '', ''),(NULL, 'pois à grain ridé et mangetout', '3', '40', '20', '', '', '3', '', '7', '9', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'fabacée', '', '', '', '', '', '', '', ''),(NULL, 'pois à grain rond ou ridé précoces', '2', '39', '19', '', '', '7', '', '10', '10', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'fabacée', '', '', '', '', '', '', '', ''),(NULL, 'pois à grain rond ou ridé précoces', '3', '40', '20', '', '', '10', '', '4', '5', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'fabacée', '', '', '', '', '', '', '', ''),(NULL, 'poivron', '', '', '', '', '', '5', '', '8', '9', '', '1', '', '', '3', '100', '', 'fruit', '', 'ne germe qu au dessus de 28°c', '', '', 'solanacée', '', '', '', '', '', '', '', ''),(NULL, 'pomme de terre', '', '70', '20', '', '', '3', '', '6', '9', '1', '2', '1', '', '3', '', '', 'racine', '', 'butter les pieds', '', '0', 'solanacée', '', '', '3', '', '1_60', '93_104', '', ''),(NULL, 'potirons', '2', '200', '200', '', '', '4', '', '9', '11', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'cucurbitacée', '', '', '', '', '', '', '', ''),(NULL, 'quinoa', '', '50', '50', '', '4', '5', '', '8', '9', '', '1', '', '', '3', '70', '', 'fruit', '1', 'quand les graines se détachent faire pendre a tête en bas et battre une fois sec', 'semis spontané', '', 'chenopodiacée', '1', '', '', '', '', '', '', ''),(NULL, 'radis de tous les mois', '1', '', '2', '', '2', '3', '', '3', '11', '', '', '', '', '', '', '', 'racine', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'radis raves', '2', '20', '5', '', '', '3', '', '5', '11', '', '', '', '', '', '', '', 'racine', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'radis d été et d automne', '2', '20', '5', '', '', '5', '', '7', '11', '', '', '', '', '', '', '', 'racine', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'radis d hiver', '2', '25', '15', '', '', '6', '', '11', '12', '', '', '', '', '', '', '', 'racine', '', '', '', '', 'brassicacée', '', '', '', '', '', '', '', ''),(NULL, 'raiponce', '1', '', '20', '', '', '5', '', '10', '3', '', '2', '', '1', '', '60', '', 'racine_feuille_fleur', '', '', '', '-20°c', 'campanulacée', '1', '', '', '', '', '', '', ''),(NULL, 'sarrasin', '3', '', '5', '', '', '4', '', '8', '10', '', '1', '', '3', '1', '50', '20', 'fruit', '', 'récolte non simultanée', '', '0', 'polygonacée', '', '', '', '', '', '', '', ''),(NULL, 'salsifis', '2', '30', '5', '', '', '3', '', '10', '3', '', '', '', '', '', '', '', 'racine', '', '', '', '', '', '', '', '', '', '', '', '', ''),(NULL, 'scorsonères', '2', '30', '5', '', '', '3', '', '10', '3', '3', '1', '', '', '', '', '', '', '', '', '', '', 'asteracée', '1', '', '', '', '', '', '', ''),(NULL, 'seigle', '2', '15', '5', '', '', '10', '', '6', '7', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'poacée', '', '', '', '', '', '', '', ''),(NULL, 'sesame', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'pédialacée', '', '', '', '', '', '', '', ''),(NULL, 'sorgho', '3', '50', '30', '', '', '5', '', '9', '10', '1', '', '', '', '', '2', '', 'fruit', '', '', '', '', 'poacée', '', '', '0 6', '', '', '', '', ''),(NULL, 'tétragone', '2', '80', '80', '3', '', '5', '', '8', '11', '', '', '', '', '', '', '', 'feuille', '', '', '', '', '', '', '', '', '', '', '', '', ''),(NULL, 'tomate', '1', '70', '60', '1', '3', '', '5', '7', '10', '1', '1', '', '', '', '', '', 'fruit', '', '', '', '', 'solanacée', '', '', '', '', '', '', '', ''),(NULL, 'topinambour', '', '', '', '', '', '1', '', '9', '2', '', '2', '', '', '3', '300', '', 'racine', '', '', '', '', 'asteracée', '1', '', '', '', '', '', '', ''),(NULL, 'tournesol', '3', '', '10', '', '', '4', '', '9', '10', '', '', '', '', '', '', '', 'fruit', '', '', '', '', 'asteracée', '', '7', '', '', '', '', '', '');";


$sql = $bdd->query($sqlfinal)or die(print_r($bdd->errorInfo()));
 		
		$sql->closeCursor();
	//print_r($pl);
	
	 mysql_close();  
	 
	 
	 
	//INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`) VALUES (NULL, 'Aubergine', '1', '50', '50', '2', '3', '4', '4', '7', '10', '1', '1', '2', '1', '2', '40', '20', 'fruit', '3', '', 'semis', '0', 'solanacée', '0'),(autres);
	//INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`) VALUES (NULL, 'Aubergine', '1', '2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''), (NULL, 'hree', '', '', '', '', '', '', '', '', '', '', '', '', '5', '', '', '', '', '', '', '', '', '', '');
	//<script>plante=<?php echo json_encode($d);	
	//INSERT INTO `db471039562`.`plante` (`ID`, `nom`, `prof`, `dligne`, `drang`, `semisint`, `semisabri`, `semisext`, `repiq`, `recolteDeb`, `recolteFin`, `vie`, `soleil`, `pH`, `eau`, `solriche`, `hauteur`, `largeur`, `type`, `racine`, `commentaire`, `multi`, `Tmin`, `famille`, `vivace`, `tpslevee`, `rendement`, `tpsconserv`, `associe`, `antiassocie`, `utilisation`, `conservalimt`) VALUES (NULL, 'houblon', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', '', '', '', '', ''), (NULL, 'hierba buena', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', '', '', '', '', '');
	
		
		?>