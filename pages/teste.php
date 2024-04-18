<?php
// Include required files
require_once '../db_handler/Item.php';
require_once '../db_handler/OrderHistory.php';
require_once '../db_handler/OrderItems.php';
require_once '../db_handler/ShoppingCart.php';
require_once '../db_handler/Users.php';
require_once '../db_handler/Wishlist.php';
require_once '../db_handler/DB.php';

$db = new Database();


    echo $_SERVER["REQUEST_METHOD"];

    $item = $db->getItemById(1);

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

function generate_item_listing($item) {
    // Initialize the listing HTML
    $listing = '<div class="item-listing">';
    
    // Display the item name
    $listing .= '<h2>' . $item->getName() . '</h2>';

    // Display the item price
    $listing .= '<p>Price: $' . number_format($item->getPrice(), 2) . '</p>';

    // Check if the item has a photo
    if ($item->getPhoto() !== null){
        // Display the item photo
        $listing .= '<img src="data:image/jpeg;base64,' . base64_encode($item->getPhoto()) . '" alt="Item Photo">';
    } else {
        // If no photo is available, display a placeholder
        $listing .= '<div class="placeholder-photo">No Photo Available</div>';
    }

    // Close the listing HTML
    $listing .= '</div>';

    return $listing;
}

$item_listing = generate_item_listing($item);


echo $item_listing;


?>
