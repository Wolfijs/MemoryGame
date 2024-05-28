<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$response = array('isAuthenticated' => false);

if (isset($_SESSION['userID'])) {
    $response['isAuthenticated'] = true;
}

echo json_encode($response);
?>
