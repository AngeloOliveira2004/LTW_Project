<?php
// Include required files

if (isset($_POST['execute'])) {
    require_once '../db_handler/Item.php';
    require_once '../db_handler/OrderHistory.php';
    require_once '../db_handler/OrderItems.php';
    require_once '../db_handler/ShoppingCart.php';
    require_once '../db_handler/Users.php';
    require_once '../db_handler/Wishlist.php';
    require_once '../db_handler/DB.php';

    // Your predetermined function
    function myFunction() {
        $database = new Database();
        for($i = 6; $i < 9 ; $i++) {
            $database->deleteItem($i);
        }
        return "Function executed successfully!";
    }

    $output = myFunction();
    echo $output;
}
?>
