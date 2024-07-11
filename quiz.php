<?php
session_start();
require_once 'db_connect.php';

function saveAnswer($userId, $section, $question, $answer) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO quiz_answers (user_id, section, question, answer) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE answer = ?");
    return $stmt->execute([$userId, $section, $question, $answer, $answer]);
}

function getQuizProgress($userId) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM quiz_answers WHERE user_id = ?");
    $stmt->execute([$userId]);
    return $stmt->fetchAll();
}

function updateQuizStatus($userId, $completed, $score) {
    global $pdo;
    $stmt = $pdo->prepare("UPDATE quiz_progress SET completed = ?, score = ? WHERE user_id = ?");
    return $stmt->execute([$completed, $score, $userId]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['user_id'])) {
    $action = $_POST['action'] ?? '';

    switch ($action) {
        case 'save_answer':
            $section = $_POST['section'] ?? '';
            $question = $_POST['question'] ?? '';
            $answer = $_POST['answer'] ?? '';
            if (saveAnswer($_SESSION['user_id'], $section, $question, $answer)) {
                echo json_encode(['success' => true, 'message' => 'Answer saved']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to save answer']);
            }
            break;
        case 'get_progress':
            $progress = getQuizProgress($_SESSION['user_id']);
            echo json_encode(['success' => true, 'progress' => $progress]);
            break;
        case 'update_status':
            $completed = $_POST['completed'] ?? false;
            $score = $_POST['score'] ?? null;
            if (updateQuizStatus($_SESSION['user_id'], $completed, $score)) {
                echo json_encode(['success' => true, 'message' => 'Quiz status updated']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to update quiz status']);
            }
            break;
    }
}
?>