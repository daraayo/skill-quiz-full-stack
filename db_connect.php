<?php
$serverName = "DESKTOP-O3R36AQ"; // or your SQL Server instance name
$connectionInfo = array(
    "Database" => "AYO",
    "Authentication" => "Windows",
);

try {
    $conn = sqlsrv_connect($serverName, $connectionInfo);
    if($conn === false) {
        throw new Exception(print_r(sqlsrv_errors(), true));
    }
} catch (Exception $e) {
    die("Error: " . $e->getMessage());
}
?>
