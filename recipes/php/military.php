<?php

require_once('SheerID.php');

if (!function_exists('property_exists')) {
  function property_exists($class, $property) {
    if (is_object($class))
      $class = get_class($class);

    return array_key_exists($property, get_class_vars($class));
  }
}

$sheerid_api = new SheerId(YOUR_KEY_HERE,'https://services.sheerid.com');

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$birthdate = $_POST['birthdate'];
$affiliationType = $_POST['servicetype']; // ACTIVE_DUTY, VETERAN, RESERVIST
$separationDate = $_POST['separationdate'];

$d = array(
	"FIRST_NAME" => $firstname,
	"LAST_NAME" => $lastname,
	"BIRTH_DATE" => $birthdate,
	"_affiliationTypes" => $affiliationType,
);

if ($affiliationType == 'VETERAN') {
	$d["STATUS_START_DATE"] = $separationDate;
}
print("Request Data:<br />");
print_r($d);
print("<br /><br />");
$response = $sheerid_api->verify($d);

$link_back = '<br /><a href="military-example.php" >Try another verification</a><br/><br/>';

if (property_exists($response, 'result')) {
	if ($response->result) {
		echo "Military status confirmed as true." . $link_back;
	}
	else {
		echo "Military status confirmed as false." . $link_back;
	}
}
print("<br /><br />");
print("Response Data:<br />");
print_r($response);

?>
