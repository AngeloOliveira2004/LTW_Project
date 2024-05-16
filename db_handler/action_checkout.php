<?php

require_once 'DB.php';
require_once 'Item.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $paymentMethod = $_POST["paymentMethod"];
    $shippingMethod = $_POST["shippingMethod"];
    $totalPrice = $_POST["totalPrice"];
    $jsonItemIds = $_POST["jsonItemIds"];
    $user = $_SESSION['userId'];

    $shoppingItemIds = json_decode($jsonItemIds);

    $db = new Database("../database/database.db");


} else {
    // Handle the case where the request method is not POST
    echo "Invalid request method";
}




?>