<?php

require_once('SheerID.php');

if (!function_exists('property_exists')) {
  function property_exists($class, $property) {
    if (is_object($class))
      $class = get_class($class);

    return array_key_exists($property, get_class_vars($class));
  }
}

$sheerid_api = new SheerId('YOUR_KEY_HERE');

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$birthdate = $_POST['birthdate'];
$organization = $_POST['organization'];

$d = array(
	"FIRST_NAME" => $firstname,
	"LAST_NAME" => $lastname,
	"BIRTH_DATE" => $birthdate,
	"_affiliationTypes" => "STUDENT_FULL_TIME","STUDENT_PART_TIME",
	"organizationId" => $organization,
);

$response = $sheerid_api->verify($d, $organization);

$link_back = '<br /><a href="example.php" >Try another verification</a><br/><br/>';

if (property_exists($response, 'result')) {
	if ($response->result) {
		echo "Student status confirmed as true." . $link_back;
		print_r($response);
	}
	else {
		echo "Student status confirmed as false." . $link_back;
		print_r($response);
	}
} else {
	echo "Student status undetermined, please upload documentation." . $link_back;
	print_r($response);
}


?>
