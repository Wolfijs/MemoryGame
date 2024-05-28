<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'db.php'; // Include the database class

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class UserEdit {
    private $db;

    public function __construct() {
        $this->db = new DB();
        if ($this->db->conn->connect_error) {
            die("Connection failed: " . $this->db->conn->connect_error);
        }
    }

    public function getUser($id) {
        $response = array();
        if (!$id) {
            $response['success'] = false;
            $response['error'] = "User ID is missing.";
            echo json_encode($response);
            return;
        }
    
        $sql = "SELECT Username, Email, Password FROM users WHERE UserID = ?";
        $stmt = $this->db->conn->prepare($sql);
        if (!$stmt) {
            $response['success'] = false;
            $response['error'] = "Failed to prepare statement: " . $this->db->conn->error;
            echo json_encode($response);
            return;
        }
    
        $stmt->bind_param("i", $id);
        if (!$stmt->execute()) {
            $response['success'] = false;
            $response['error'] = "Failed to execute statement: " . $stmt->error;
            echo json_encode($response);
            return;
        }
    
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            // Unhashing the password
            $row['Password'] = password_verify($row['Password'], $row['Password']) ? $row['Password'] : ''; // Verify hashed password
            $response['success'] = true;
            $response['data'] = $row;
        } else {
            $response['success'] = false;
            $response['error'] = "User not found.";
        }
    
        echo json_encode($response);
    }
}

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    exit();
} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['id'])) {
        $userEdit = new UserEdit();
        $userEdit->getUser($_GET['id']);
    } else {
        echo json_encode(array('success' => false, 'error' => 'User ID is required.'));
    }
}
?>
