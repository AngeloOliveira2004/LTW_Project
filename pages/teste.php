<?php
// Include required files

if (isset($_POST['execute'])) {
    require_once '../utility/Item.php';
    require_once '../utility/OrderHistory.php';
    require_once '../utility/OrderItems.php';
    require_once '../utility/ShoppingCart.php';
    require_once '../utility/Users.php';
    require_once '../utility/Wishlist.php';
    require_once '../utility/DB.php';

    // Your predetermined function
    function myFunction() {
        $database = new Database();
        $database->insertItem(new Item(1, "name", "description", "category", 10.0, "condition", true, 1));
        return "Function executed successfully!";
    }

    $output = myFunction();
    echo $output;
}
?>
