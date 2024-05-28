<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include 'db.php';

class LevelFetcher {
    private $connection;

    public function __construct($db) {
        $this->connection = $db->conn;
    }

    public function fetchUserLevel($userID) {
        if ($userID !== null) {
            $query = "SELECT Level FROM scores WHERE UserID = $userID ORDER BY Level DESC LIMIT 1";
            $result = $this->connection->query($query);

            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();
                return $row['Level'];
            } else {
                return 0;
            }
        } else {
            return null;
        }
    }
}

$db = new DB();
$levelFetcher = new LevelFetcher($db);
$userID = isset($_GET['userID']) ? $_GET['userID'] : null;

if ($userID !== null) {
    // Log that user ID was received
    error_log("Received user ID: $userID");
    
    $userLevel = $levelFetcher->fetchUserLevel($userID);
    echo json_encode(['userLevel' => $userLevel]);
} else {
    // Log that user ID was not provided
    error_log('UserID not provided');
    
    echo json_encode(['error' => 'UserID not provided']);
}
?>
