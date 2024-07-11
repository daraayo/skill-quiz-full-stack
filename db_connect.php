<?php
$serverName = "your_server_name"; // could be localhost or an IP address
$connectionInfo = array(
    "Database" => "skills_assessment_quiz",
    "UID" => "your_username",
    "PWD" => "your_password"
);

try {
    $conn = sqlsrv_connect($serverName, $connectionInfo);
    if ($conn === false) {
        throw new Exception("Unable to connect to database.");
    }
} catch (Exception $e) {
    die("Error: " . $e->getMessage());
}
?>
