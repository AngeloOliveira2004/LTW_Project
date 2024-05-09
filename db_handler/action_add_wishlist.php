<?php
declare(strict_types=1);

session_start();

require_once(__DIR__ . '/connection.php');
require_once(__DIR__ . '/Wishlist.php');
require_once(__DIR__ . '/DB.php');
require_once(__DIR__ . '/itemmove.php');

if (!isset($_SESSION['userId'])) {
    header("Location: ../pages/userReg.php");
}

$userId = $_SESSION['userId'];

$itemId = $_POST['itemId'] ?? null; 

$dB = new Database("../database/database.db");
$db = new DB();
$dbh = $db->get_database_connection();

$wishlistItem = new WishlistItem(null, $userId, $itemId);

add_item_to_wishlist($dbh, $wishlistItem);

$wishlistItems = get_wishlist_items_ids($dbh, $userId);


echo json_encode(['wishlistItems' => $itemId, 'message' => 'Sucesso']);
?>