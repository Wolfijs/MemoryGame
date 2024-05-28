<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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

    public function editUser($id, $username, $email, $password) {
        $response = array();
        if (!$id) {
            $response['success'] = false;
            $response['error'] = "User ID is missing.";
            echo json_encode($response);
            return;
        }

        // You may want to add additional validation for username, email, and password

        // Hash the password before storing
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $sql = "UPDATE users SET Username = ?, Email = ?, Password = ? WHERE UserID = ?";
        $stmt = $this->db->conn->prepare($sql);
        if (!$stmt) {
            $response['success'] = false;
            $response['error'] = "Failed to prepare statement: " . $this->db->conn->error;
            echo json_encode($response);
            return;
        }

        $stmt->bind_param("sssi", $username, $email, $hashedPassword, $id);
        if (!$stmt->execute()) {
            $response['success'] = false;
            $response['error'] = "Failed to execute statement: " . $stmt->error;
            echo json_encode($response);
            return;
        }

        // If the update was successful, fetch and return the updated user data
        $this->getUser($id);
    }

    private function getUser($id) {
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
} elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['id'], $data['editedUsername'], $data['editedEmail'], $data['editedPassword'])) {
        $userEdit = new UserEdit();
        $userEdit->editUser($data['id'], $data['editedUsername'], $data['editedEmail'], $data['editedPassword']);
    } else {
        echo json_encode(array('success' => false, 'error' => 'Incomplete data.'));
    }
}
?>
