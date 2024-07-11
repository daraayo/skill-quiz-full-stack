<?php
session_start();
require_once 'db_connect.php';

function getUserStats() {
    global $conn;
    $sql = "
        SELECT 
            COUNT(DISTINCT u.id) as total_users,
            SUM(CASE WHEN qp.completed = 1 THEN 1 ELSE 0 END) as completed_users,
            SUM(CASE WHEN qp.completed = 0 THEN 1 ELSE 0 END) as incomplete_users
        FROM users u
        LEFT JOIN quiz_progress qp ON u.id = qp.user_id
        WHERE u.is_admin = 0
    ";
    $stmt = sqlsrv_query($conn, $sql);
    return sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
}

function getUserList() {
    global $conn;
    $sql = "
        SELECT 
            u.username,
            CASE WHEN qp.completed = 1 THEN 'Completed' ELSE 'Incomplete' END as status,
            qp.score
        FROM users u
        LEFT JOIN quiz_progress qp ON u.id = qp.user_id
        WHERE u.is_admin = 0
        ORDER BY u.username
    ";
    $stmt = sqlsrv_query($conn, $sql);
    $users = [];
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $users[] = $row;
    }
    return $users;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_SESSION['is_admin']) && $_SESSION['is_admin']) {
    $action = $_GET['action'] ?? '';

    switch ($action) {
        case 'get_stats':
            $stats = getUserStats();
            echo json_encode(['success' => true, 'stats' => $stats]);
            break;
        case 'get_user_list':
            $users = getUserList();
            echo json_encode(['success' => true, 'users' => $users]);
            break;
    }
}
?>
