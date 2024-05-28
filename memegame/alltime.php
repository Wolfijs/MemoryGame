<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once 'DB.php'; 

class Leaderboard extends DB {
    
    public function getAllTimeLeaderScores() {
        $sql = "SELECT u.Username, s.Level, s.Score
                FROM scores s
                INNER JOIN users u ON s.UserID = u.UserID
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
            echo json_encode(array("message" => "0 results"));
            return;
        }
        
        http_response_code(200);
        echo json_encode(array("data" => $rows));
    }
}

try {
    $leaderboard = new Leaderboard();
    $leaderboard->getAllTimeLeaderScores();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Error: " . $e->getMessage()));
}

?>
