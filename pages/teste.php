<?php
// Include required files
require_once '../db_handler/Item.php';
require_once '../db_handler/OrderHistory.php';
require_once '../db_handler/OrderItems.php';
require_once '../db_handler/ShoppingCart.php';
require_once '../db_handler/Users.php';
require_once '../db_handler/Wishlist.php';
require_once '../db_handler/DB.php';

echo $_FILES["imageData"];

echo $_POST["itemId"];

echo $_SERVER["REQUEST_METHOD"];



if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["imageData"]) && isset($_POST["itemId"])) {
    // Initialize the database
    $db = Database::getInstance();

    // Get the item ID from the form data
    $itemId = $_POST["itemId"];

    // Get the image data
    $imageData = $_FILES["imageData"];

    // Call the insertImageOnItem function with the item ID and image data
    $db->insertImageOnItem($itemId, $imageData);
    
    // Output success message
    echo "Image uploaded successfully.";
} else {
    // Output error message if the form data is not provided
    echo "Error: Invalid request.";
}


?>
