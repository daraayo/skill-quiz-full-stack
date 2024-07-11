<?php
$serverName = "localhost\\SQLEXPRESS"; // or your SQL Server instance name
$connectionInfo = array(
    "Database" => "skills_assessment_quiz",
    "UID" => "sa", // default SQL Server admin account
    "PWD" => "your_sa_password" // the password you set for 'sa' during SQL Server installation
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
