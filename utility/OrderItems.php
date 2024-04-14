
<?php

class OrderItem {
    public $OrderItemId;
    public $OrderId;
    public $ItemId;
    public $Quantity;
    public $Price;

    public function __construct($OrderItemId, $OrderId, $ItemId, $Quantity, $Price) {
        $this->OrderItemId = $OrderItemId;
        $this->OrderId = $OrderId;
        $this->ItemId = $ItemId;
        $this->Quantity = $Quantity;
        $this->Price = $Price;
    }
}



?>