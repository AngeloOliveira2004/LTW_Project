<?php
declare(strict_types=1);

session_start();

require_once(__DIR__ . '/connection.php');
require_once(__DIR__ . '/Wishlist.php');
require_once(__DIR__ . '/DB.php');
require_once(__DIR__ . '/itemmove.php');

// Verifica se o usuário está logado
if (!isset($_SESSION['userId'])) {
    // Redireciona o usuário para a página de login
    header("Location: ../pages/userReg.php");
    exit();
}

// Obtém o ID do usuário logado
$userId = $_SESSION['userId'];

// Obtém o ID do item a ser adicionado à Wishlist
$itemId = $_POST['itemId'] ?? null; // Use null coalescing operator to handle unset itemId

// Cria uma instância do objeto Database
$dB = new Database("../database/database.db");
$db = new DB();
$dbh = $db->get_database_connection();

// Cria uma instância do objeto WishlistItem
$wishlistItem = new WishlistItem(null, $userId, $itemId);

// Adiciona o item à Wishlist
add_item_to_wishlist($dbh, $wishlistItem);

// Redireciona de volta para a página de origem
header("Location: ../pages/wishlist.php");
exit();

?>