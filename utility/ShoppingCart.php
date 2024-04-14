<?php 

class ShoppingCartItem {
    public $CartItemId;
    public $UserId;
    public $ItemId;

    public function __construct($CartItemId, $UserId, $ItemId) {
        $this->CartItemId = $CartItemId;
        $this->UserId = $UserId;
        $this->ItemId = $ItemId;
    }
}



?>