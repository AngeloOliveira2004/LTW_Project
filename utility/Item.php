
<?php

require_once 'Users.php';

class Item {
// Properties (attributes)
    public $id;
    public $name;
    public $description;
    public $category;
    public $price;
    public $condition;
    public $available;
    public $userId;


    public function __constructer($id, $name, $description, $category, $price, $condition, $available, $userId) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->category = $category;
        $this->price = $price;
        $this->condition = $condition;
        $this->available = $available;
        $this->userId = $userId;
    }

    public function __construct($id) {
        $this->id = $id;
        $this->name = "";
        $this->description = "";
        $this->category = "";
        $this->price = 0.0;
        $this->condition = "";
        $this->available = false;
        $this->userId = -1;
    }

    // Method to display car details
    public function displayDetails() {
        echo "Id: " . $this->id . "<br>";
        echo "Name: " . $this->name . "<br>";
        echo "Description: " . $this->description . "<br>";
        echo "Price: " . $this->price . "<br>";
        echo "Condition: " . $this->condition . "<br>";
        echo "Available: " . $this->available . "<br>";
        echo "User Id: " . $this->userId . "<br>";
    }

    public function getUserId() : int {
        return $this->userId;
    }
}


?>

