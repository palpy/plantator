<?php include_once('./connection.php');

  header('Content-Type: text/html; charset=utf-8');

  /* Construction de la requête filtrée */

  // Paging
  $sLimit = "";
  if ( isset( $_GET['start'] ) && $_GET['length'] != '-1' ) {
  	$sLimit = "LIMIT ". $_GET['start'] .", ". $_GET['length'];
  }

  // Ordering

  // Mapping index column -> field name in database
  $sortMapping = array();
  $sortMapping[0] = 'LOWER(nom)';

  $sOrder = "";
  if ( isset( $_GET['order'] ) ) {
  	$sOrder = "ORDER BY  ";
  	for ( $i=0 ; $i<intval( $_GET['order'] ) ; $i++ ) {
      $columnOrder = $_GET['order'][$i];
      $columnNum = $columnOrder['column'];
      $dir = $columnOrder['dir'];
  		if ( $_GET[ 'columns'][$i]['orderable'] == "true" ) {
  			$sOrder .= $sortMapping[$columnNum];
        if ( $dir == 'desc') {
          $sOrder .= " ".$dir;
        }
        $sOrder .= ", ";
  		}
  	}
  	$sOrder = substr_replace( $sOrder, "", -2 );
  	if ( $sOrder == "ORDER BY" ) {
  		$sOrder = "";
  	}
  }


  // Filtering
  $sWhere = "";
  if ( isset( $_GET['search'] ) && $_GET['search']['value'] != "" ) {
  	$sWhere = "WHERE (";
    $sWhere .= "nom LIKE '%". $_GET['search']['value'] ."%' OR ";
  	/*for ( $i=0 ; $i<count($aColumns) ; $i++ ){
  		$sWhere .= $aColumns[$i]." LIKE '%".mysql_real_escape_string( $_GET['sSearch'] )."%' OR ";
  	}*/
  	$sWhere = substr_replace( $sWhere, "", -3 );
  	$sWhere .= ')';
  }


  // Filtering on custom filters
  $customFilters = array();
  if ( isset( $_GET['semisext'] ) && $_GET['semisext'] != "0" ) {
    array_push($customFilters, "(semisext = '". $_GET['semisext'] ."')");
  }
  if ( isset( $_GET['moistaille'] ) && $_GET['moistaille'] != "0" ) {
    array_push($customFilters, "(moistaille = '". $_GET['moistaille'] ."')");
  }
  if ( isset( $_GET['recolte'] ) && $_GET['recolte'] != "0" ) {
    array_push($customFilters, "(recolteDeb <= '". $_GET['recolte'] ."' AND recolteFin >= '". $_GET['recolte'] ."')");
  }
  if ( isset( $_GET['vivace'] ) && $_GET['vivace'] != "0" ) {
    array_push($customFilters, "(vivace = '". $_GET['vivace'] ."')");
  }
  if ( isset( $_GET['hauteur'] ) && $_GET['hauteur'] != '0' ) {
    list($min, $max) = explode("_", $_GET['hauteur']);
    array_push($customFilters, "(hauteur != '0' AND hauteur <= '". $max ."' AND hauteur >= '". $min ."')");
  }
  if ( isset( $_GET['soleil'] ) && $_GET['soleil'] != "0" ) {
    array_push($customFilters, "(soleil = '". $_GET['soleil'] ."')");
  }
  if ( isset( $_GET['usagemedic'] ) && $_GET['usagemedic'] != "0" ) {
    array_push($customFilters, "(usagemedic LIKE '%_". $_GET['usagemedic'] ."_%')");
  }
  if ( isset( $_GET['utilisation'] ) && $_GET['utilisation'] != "0" ) {
    array_push($customFilters, "(utilisation LIKE '%_". $_GET['utilisation'] ."_%')");
  }

  if (count($customFilters) > 0) {
    $strCustomFilters = join(' AND ', $customFilters);
    if ( $sWhere == "" ) {
      $sWhere = "WHERE ". $strCustomFilters;
    } else {
      $sWhere .= " AND ". $strCustomFilters;
    }
  }


  /*
   * SQL queries
   * Get data to display
   */
  $sQuery = "
  	SELECT * FROM
    $TABLE_PLANT
  	$sWhere
  	$sOrder
  	$sLimit
  ";
  $plantes = $bdd->query( $sQuery ) or die(mysql_error());

  /* Data set length after filtering */
  $sQuery = "
  	SELECT count(ID) FROM
    $TABLE_PLANT
  	$sWhere
  ";
  $rResultFilterTotal = $bdd->query( $sQuery ) or die(mysql_error());
  $aResultFilterTotal = $rResultFilterTotal->fetch();
  $iFilteredTotal = $aResultFilterTotal[0];

  /* Total data set length */
  $sQuery = "
  	SELECT COUNT(ID)
  	FROM   $TABLE_PLANT
  ";
  $rResultTotal = $bdd->query( $sQuery ) or die(mysql_error());
  $aResultTotal = $rResultTotal->fetch();
  $iTotal = $aResultTotal[0];


  // Récupération en base des infos liées aux plantes;
  // Même code que dans p_recupdata.php !!

  $result= array();

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
    $row = [];
    foreach ($plante as $key => $value){
    	$row[$key]=$value;
    }
    $row['multi'] = split('_', $row['multi']);
    $row['utilisation'] = split('_', $row['utilisation']);
    $row['usagemedic'] = split('_', $row['usagemedic']);

    $row['type'] = array_keys($result_harvest[$plante['ID']]);
    $row['recolte'] = $result_harvest[$plante['ID']];
    $row['associe'] = $result_neighbours[$plante['ID']]['1'];
    $row['antiassocie'] = $result_neighbours[$plante['ID']]['0'];
    array_push($result, $row);
  }

  $compagnonnages->closeCursor();
  $recoltes->closeCursor();
  $plantes->closeCursor();

  /*
   * Output
   */
  $output = array(
    "sEcho" => intval($_GET['draw']),
    "iTotalRecords" => $iTotal,
    "iTotalDisplayRecords" => $iFilteredTotal,
    "data" => $result
  );

  mysql_close();

  echo json_encode($output);

?>
