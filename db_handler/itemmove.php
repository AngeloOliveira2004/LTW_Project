<?php
declare(strict_types= 1);
require_once(__DIR__ . '/connection.php');
require_once(__DIR__ . '/Whishlist.php');

function add_item_to_wishlist($dbh, $WishlistId, WishlistItem $wishlistItem) : void{
    $query = $dbh->prepare('INSERT INTO Wishlist (UserId, ItemId)');
    $query->execute(array($wishlistItem->getUserId(), $wishlistItem->getItemId()));
    header('Location: wishlist.php');
    
}

function add_item_shopping_cart($dbh, $CartItemId, ShoppingCartItem $shoppingCartItem): void
{
    $query = $dbh->prepare('INSERT INTO ShoppingCart(UserId, ItemId)');
    $query->execute(array($shoppingCartItem->getUserId()));
    header('Location: Shoppingcart.php');
}

?>