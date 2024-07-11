<?php
session_start();
require_once 'db_connect.php';

function getUserStats() {
    global $pdo;
    $stmt = $pdo->query("
        SELECT 
            COUNT(DISTINCT u.id) as total_users,
            SUM(CASE WHEN qp.completed = 1 THEN 1 ELSE 0 END) as completed_users,
            SUM(CASE WHEN qp.completed = 0 THEN 1 ELSE 0 END) as incomplete_users
        FROM users u
        LEFT JOIN quiz_progress qp ON u.id = qp.user_id
        WHERE u.is_admin = 0
    ");
    return $stmt->fetch();
}

function getUserList() {
    global $pdo;
    $stmt = $pdo->query("
        SELECT 
            u.username,
            CASE WHEN qp.completed = 1 THEN 'Completed' ELSE 'Incomplete' END as status,
            qp.score
        FROM users u
        LEFT JOIN quiz_progress qp ON u.id = qp.user_id
        WHERE u.is_admin = 0
        ORDER BY u.username
    ");
    return $stmt->fetchAll();
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