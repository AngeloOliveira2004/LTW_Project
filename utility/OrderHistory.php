

<?php

class OrderHistory {
    public $OrderId;
    public $UserId;
    public $OrderDate;
    public $TotalPrice;
    public $Status;

    public function __construct($OrderId, $UserId, $OrderDate, $TotalPrice, $Status) {
        $this->OrderId = $OrderId;
        $this->UserId = $UserId;
        $this->OrderDate = $OrderDate;
        $this->TotalPrice = $TotalPrice;
        $this->Status = $Status;
    }
}

?>