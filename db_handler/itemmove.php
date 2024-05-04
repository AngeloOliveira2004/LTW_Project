<?php
declare(strict_types=1);
require_once(__DIR__ . '/connection.php');
require_once(__DIR__ . '/Wishlist.php');

function add_item_to_wishlist($dbh, WishlistItem $wishlistItem): void {
    
        $query = $dbh->prepare('INSERT INTO Wishlist (UserId, ItemId) VALUES (?, ?);');
        $query->execute([$wishlistItem->getUserId(), $wishlistItem->getItemId()]);
    
}


function add_item_shopping_cart($dbh, $CartItemId, ShoppingCartItem $shoppingCartItem): void
{
$query = $dbh->prepare('INSERT INTO ShoppingCart(UserId, ItemId);');
$query->execute(array($shoppingCartItem->getUserId()));
header('Location: Shoppingcart.php');
}

?>