<?php
// score.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Include the database connection file
require_once 'db.php';

// Create a new database connection
$db = new DB();
$conn = $db->conn;

// Retrieve POST data
$data = json_decode(file_get_contents('php://input'), true);

$userID = $data['userID'];
$score = $data['score'];
$level = $data['level'];

if (!$userID || !$score || !$level) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}


$stmt = $conn->prepare('INSERT INTO scores (UserID, Score,Level) VALUES (?, ?, ?)');

$stmt->bind_param('iii', $userID, $score,$level);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Score inserted successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to insert score: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
