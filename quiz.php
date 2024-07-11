<?php
session_start();
require_once 'db_connect.php';

function saveAnswer($userId, $section, $question, $answer) {
    global $conn;
    $sql = "MERGE INTO quiz_answers AS target
            USING (VALUES (?, ?, ?, ?)) AS source (user_id, section, question, answer)
            ON target.user_id = source.user_id AND target.section = source.section AND target.question = source.question
            WHEN MATCHED THEN UPDATE SET target.answer = source.answer
            WHEN NOT MATCHED THEN INSERT (user_id, section, question, answer) VALUES (source.user_id, source.section, source.question, source.answer);";
    $params = array($userId, $section, $question, $answer);
    $stmt = sqlsrv_query($conn, $sql, $params);
    return $stmt !== false;
}

function getQuizProgress($userId) {
    global $conn;
    $sql = "SELECT * FROM quiz_answers WHERE user_id = ?";
    $params = array($userId);
    $stmt = sqlsrv_query($conn, $sql, $params);
    $progress = [];
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $progress[] = $row;
    }
    return $progress;
}

function updateQuizStatus($userId, $completed, $score) {
    global $conn;
    $sql = "UPDATE quiz_progress SET completed = ?, score = ? WHERE user_id = ?";
    $params = array($completed, $score, $userId);
    $stmt = sqlsrv_query($conn, $sql, $params);
    return $stmt !== false;
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
        case 'get_answer':
            $section = $_POST['section'] ?? '';
            $question = $_POST['question'] ?? '';
            $sql = "SELECT answer FROM quiz_answers WHERE user_id = ? AND section = ? AND question = ?";
            $params = array($_SESSION['user_id'], $section, $question);
            $stmt = sqlsrv_query($conn, $sql, $params);
            $answer = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
            echo json_encode(['success' => true, 'answer' => $answer ? $answer['answer'] : null]);
            break;
    }
}
?>
