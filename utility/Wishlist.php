<?php

class WishlistItem {
    public $WishlistId;
    public $UserId;
    public $ItemId;

    public function __construct($WishlistId, $UserId, $ItemId) {
        $this->WishlistId = $WishlistId;
        $this->UserId = $UserId;
        $this->ItemId = $ItemId;
    }
}



?>