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

    public function loginUser($username, $password) {
        $conn = $this->db->conn;

        $stmt = $conn->prepare("SELECT UserID, Password FROM Users WHERE Username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($userID, $hashedPassword);
            $stmt->fetch();
            if (password_verify($password, $hashedPassword)) {
                return array('success' => true, 'userID' => $userID);
            } else {
                return array('success' => false, 'message' => 'Incorrect password');
            }
        } else {
            return array('success' => false, 'message' => 'User not found');
        }
    }
}

$userManager = new UserManager();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];
    $password = $data['password'];

    $result = $userManager->loginUser($username, $password);

    header('Content-Type: application/json'); // Set content type to JSON

    if ($result['success']) {
        echo json_encode(array('success' => true, 'userID' => $result['userID']));
    } else {
        echo json_encode($result);
    }

    // Remove the console output here
}
?>
