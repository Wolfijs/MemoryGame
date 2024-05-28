<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'db.php'; // Include the database class

class UserRegistration {
    private $db;

    public function __construct() {
        $this->db = new DB();
    }

    public function registerUser($data) {
        $username = $data['username'];
        $email = $data['email'];
        $password = $data['password'];

        // Check if email already exists
        $emailQuery = "SELECT * FROM users WHERE Email = ?";
        $emailStmt = $this->db->conn->prepare($emailQuery);
        $emailStmt->bind_param("s", $email);
        $emailStmt->execute();
        $emailResult = $emailStmt->get_result();
        if ($emailResult->num_rows > 0) {
            $response['success'] = false;
            $response['error'] = "Email is already registered";
            echo json_encode($response);
            return;
        }

        // Check if username already exists
        $usernameQuery = "SELECT * FROM users WHERE Username = ?";
        $usernameStmt = $this->db->conn->prepare($usernameQuery);
        $usernameStmt->bind_param("s", $username);
        $usernameStmt->execute();
        $usernameResult = $usernameStmt->get_result();
        if ($usernameResult->num_rows > 0) {
            $response['success'] = false;
            $response['error'] = "Username is already taken";
            echo json_encode($response);
            return;
        }

        // If email and username are unique, proceed with registration
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (Username, Email, Password) VALUES (?, ?, ?)";
        $stmt = $this->db->conn->prepare($sql);
        $stmt->bind_param("sss", $username, $email, $hashedPassword);

        $response = array();

        if ($stmt->execute()) {
            $response['success'] = true;
        } else {
            $response['success'] = false;
            $response['error'] = "Error: " . $sql . "<br>" . $this->db->conn->error;
        }

        echo json_encode($response);
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userRegistration = new UserRegistration();
    $data = json_decode(file_get_contents('php://input'), true);
    $userRegistration->registerUser($data);
}
?>
