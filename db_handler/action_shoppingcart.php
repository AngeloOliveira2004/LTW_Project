<?php
declare (strict_types= 1);

session_start();

require_once(__DIR__ . '/connection.php');
require_once(__DIR__ . '/ShoppingCart.php');
require_once(__DIR__ . '/DB.php');
require_once(__DIR__ . '/itemmove.php');

if (!isset($_SESSION['userId'])) {
    header("Location: ../pages/userReg.php");
    exit();
}

// Obtém o ID do usuário logado
$userId = $_SESSION['userId'];

// Obtém o ID do item a ser adicionado à Wishlist
$itemId = $_POST['itemId'] ?? null; 
$dB = new Database("../database/database.db");
$db = new DB();

$dbh = $db->get_database_connection();

$shoppingcartItem = new ShoppingCartItem(null, $userId, $itemId);

add_item_shopping_cart($dbh, $shoppingcartItem);
header("Location: ../pages/shopping.php");


echo json_encode(['shoppingcartitems' => $itemId, 'message' => 'Sucesso']);
?>