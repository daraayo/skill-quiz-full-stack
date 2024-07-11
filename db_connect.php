<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$serverName = "DESKTOP-O3R36AQ"; // adjust if your instance name is different
$connectionInfo = array(
    "Database" => "skills_assessment_quiz",
    "UID" => "quizapp",
    "PWD" => "YourStrongPassword123!" // use the password you set in step 5
);

$conn = sqlsrv_connect($serverName, $connectionInfo);

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

echo "Connected successfully";
?>
