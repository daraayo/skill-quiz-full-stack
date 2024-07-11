<?php
session_start();
require_once 'db_connect.php';

function register($username, $password) {
    global $pdo;
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    if ($stmt->execute([$username, $hashed_password])) {
        $user_id = $pdo->lastInsertId();
        $stmt = $pdo->prepare("INSERT INTO quiz_progress (user_id) VALUES (?)");
        return $stmt->execute([$user_id]);
    }
    return false;
}

function login($username, $password) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
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