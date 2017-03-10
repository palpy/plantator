<?php include_once('./connection.php');

  header('Content-Type: text/html; charset=utf-8');

  // Check if a garden with name as id is already existing
  function checkExistingGarden($bdd, $table, $id) {
    error_log($id);
    $query = 'SELECT COUNT(id) FROM '. $table . ' WHERE id="'. $id .'";';
    $result = $bdd->query( $query ) or die(mysql_error());
    $result = $result->fetch();
    return $result[0][0] > 0;
  }

  // Load garden with name as id in parameter
  function loadGarden($bdd, $table, $id) {
    $query = "SELECT * FROM ".$table." WHERE id='". $id ."';";
    $result = $bdd->query( $query ) or die(mysql_error());
    $result = $result->fetch();
    $response = array();
    $response['status'] = TRUE;
    $response['id'] = $id;
    $response['data'] = json_decode($result['content']);
    return $response;
  }

  // Save garden in table 'potager'
  function saveGarden($bdd, $table, $data) {
    error_log(print_r($data, TRUE));
    $id = $data['id'];
    if (strlen($data['id']) < 5 || strlen($data['id']) > 50) {
      $response = array();
      $response['status'] = FALSE;
      $response['error'] = 'Le nom doit contenir entre 5 et 50 caractères';
      return $response;
    }
    $isExisting = checkExistingGarden($bdd, $table, $id);
    $expirationDate = strtotime('+30 days', time());
    if ($isExisting) {
      $query = "UPDATE ". $table ." SET content='".json_encode($data)."', expirationdate=FROM_UNIXTIME(".$expirationDate.") WHERE id='". $data['id'] ."';";
    } else {
      $query = "INSERT INTO ". $table ." (`id`, `expirationdate`, `content`) VALUES ('".$data['id']."', FROM_UNIXTIME(".$expirationDate."), '".json_encode($data)."');";
    }
    $result = $bdd->query( $query ) or die(mysql_error());
    $result = $result->fetch();
    $response = array();
    $response['status'] = TRUE;
    $response['id'] = $id;
    return $response;
  }

  $action = null;
  if ( isset( $_GET['action'] ) ) {
    $action = $_GET['action'];
  } else if (isset( $_POST['action'] ) ) {
    $action = $_POST['action'];
  }

  switch($action) {
    case 'checkExisting':
      $isExisting = checkExistingGarden($bdd, $TABLE_GARDEN, $_GET['id']);
      $response = array();
      $response['status'] = TRUE;
      $response['isExisting'] = $isExisting;
      break;
    case 'load':
      $response = loadGarden($bdd, $TABLE_GARDEN, $_GET['id']);
      break;
    case 'save':
      $data = json_decode($_POST['data']);
      $data = json_decode(json_encode($data), true);
      $response = saveGarden($bdd, $TABLE_GARDEN, $data);
      break;
    default:
      $response = array();
      $response['status'] = FALSE;
      $response['error'] = 'Traitement non géré par le serveur. Veuillez contacter le support technique';
      break;
  }

  echo json_encode($response);

?>
