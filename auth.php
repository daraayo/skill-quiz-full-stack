<?php
session_start();
require_once 'db_connect.php';

function register($username, $password) {
    global $conn;
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    $params = array($username, $hashed_password);
    $stmt = sqlsrv_query($conn, $sql, $params);
    if ($stmt === false) {
        return false;
    }
    sqlsrv_free_stmt($stmt);

    $user_id = sqlsrv_query($conn, "SELECT @@IDENTITY AS id");
    $user_id = sqlsrv_fetch_array($user_id)['id'];

    $sql = "INSERT INTO quiz_progress (user_id) VALUES (?)";
    $params = array($user_id);
    $stmt = sqlsrv_query($conn, $sql, $params);
    return $stmt !== false;
}

function login($username, $password) {
    global $conn;
    $sql = "SELECT * FROM users WHERE username = ?";
    $params = array($username);
    $stmt = sqlsrv_query($conn, $sql, $params);
    $user = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['is_admin'] = $user['is_admin'];
        return true;
    }
    return false;
}

function logout() {
    session_unset();
    session_destroy();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    switch ($action) {
        case 'register':
            if ($username === 'admin') {
                echo json_encode(['success' => false, 'message' => 'Cannot register as admin']);
            } elseif (register($username, $password)) {
                echo json_encode(['success' => true, 'message' => 'Registration successful']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Registration failed']);
            }
            break;
        case 'login':
            if (login($username, $password)) {
                echo json_encode(['success' => true, 'message' => 'Login successful', 'is_admin' => $_SESSION['is_admin']]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
            }
            break;
        case 'logout':
            logout();
            echo json_encode(['success' => true, 'message' => 'Logout successful']);
            break;
    }
}
?>
