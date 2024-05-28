<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once('db.php');

class UserManager {
    private $db;

    public function __construct() {
        $this->db = new DB();
    }

    public function checkAuth($userID) {
        $conn = $this->db->conn;

        $stmt = $conn->prepare("SELECT UserID FROM Users WHERE UserID = ?");
        $stmt->bind_param("i", $userID);
        $stmt->execute();
        $stmt->store_result();

        return $stmt->num_rows > 0;
    }
}

$userManager = new UserManager();
$data = json_decode(file_get_contents('php://input'), true);
$response = array('isAuthenticated' => false);

if (isset($data['userID'])) {
    $userID = $data['userID'];
    if ($userManager->checkAuth($userID)) {
        $response['isAuthenticated'] = true;
    }
}

header('Content-Type: application/json'); // Set content type to JSON
echo json_encode($response); // Output only JSON data
?>
