<?php

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

    // Constructor with all attributes
    public function __construct($id, $name, $description, $category, $price, $condition, $available, $userId) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->category = $category;
        $this->price = $price;
        $this->condition = $condition;
        $this->available = $available;
        $this->userId = $userId;
    }

    // Method to display item details
    public function displayDetails() {
        echo "Id: " . $this->id . "<br>";
        echo "Name: " . $this->name . "<br>";
        echo "Description: " . $this->description . "<br>";
        echo "Category: " . $this->category . "<br>";
        echo "Price: " . $this->price . "<br>";
        echo "Condition: " . $this->condition . "<br>";
        echo "Available: " . ($this->available ? "Yes" : "No") . "<br>";
        echo "User Id: " . $this->userId . "<br>";
    }
}

?>
