<?php
$serverName = "DESKTOP-03R36AQ"; // could be localhost or an IP address
$connectionInfo = array(
    "Database" => "skills_assessment_quiz",
    "Authentication" => "Windows"
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
