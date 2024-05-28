<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once 'DB.php'; 

class Leaderboard extends DB {
    
    public function getPersonalLeaderScores($userID) {
        $userID = $this->conn->real_escape_string($userID); // Sanitize input to prevent SQL injection
    
        $sql = "SELECT u.Username, s.Level, s.Score
                FROM scores s
                INNER JOIN users u ON s.UserID = u.UserID
                WHERE s.UserID = '$userID'
                ORDER BY s.Score DESC";
        
        $result = $this->conn->query($sql);
        
        if ($result === false) {
            http_response_code(500);
            echo json_encode(array("message" => "Error: " . $this->conn->error));
            return;
        }
        
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        
        if (empty($rows)) {
            http_response_code(404);
            echo json_encode(array("message" => "No scores found for user with ID: $userID"));
            return;
        }
        
        http_response_code(200);
        echo json_encode(array("data" => $rows));
    }
}

try {
    // Assuming you get the userID from the query parameters
    $userID = $_GET['userID'];

    $leaderboard = new Leaderboard();
    $leaderboard->getPersonalLeaderScores($userID);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Error: " . $e->getMessage()));
}
?>
