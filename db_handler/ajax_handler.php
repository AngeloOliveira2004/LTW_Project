<?php
    require_once 'DB.php';

    // Check if the 'action' parameter is set in the POST request
    if(isset($_POST['action'])) {
        // Retrieve the value of the 'action' parameter
        $action = $_POST['action'];

        // Create a new instance of the Database class
        $db = new Database();

        // Switch statement to handle different actions
        switch($action) {
            case 'getItemsName':
                // Call the method to get item names from the database
                $itemNames = $db->getItemsName();
                // Encode the item names array as JSON and echo it
                echo json_encode($itemNames);
                break;
            case 'otherAction':
                echo json_encode(['error' => 'Not implemented']);
                break;
            default:
                echo json_encode(['error' => 'Invalid action']);
        }
    } else {
        // If 'action' parameter is not provided in the POST request
        echo json_encode(['error' => 'No action provided']);
    }
?>
