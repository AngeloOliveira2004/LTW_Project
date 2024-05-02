<?php

declare(strict_types= 1);

session_start();

require_once (__DIR__ . '/connection.php');
require_once (__DIR__ . '/itemmove.php');
$db = new DB();
$dbh = $db->get_database_connection();
$wishlistItem = new WishlistItem($WishlistId, $userId, $ItemID);
add_item_to_wishlist($dbh, $WishlistId ,$wishlistItem);
$dB = new Database("../database/database.db");
$userId = $user->getId();
$itemId = $_GET['item'];
$ItemID = $dB->getItemById($itemId);

header("Location: ../pages/wishlist.php");