
<?php

require_once 'Users.php';

class Item {
// Properties (attributes)
    public $id;
    public $name;
    public $description;
    public $brand;
    public $category;
    public $price;
    public $condition;
    public $available;

    public $available_for_delivery;
    public $subCategory;
    public $model;
    public $size;

    public $userId;


    public function __construct($id, $name, $description, $brand , $model , $category, $size , $price, $condition, $available, $available_for_delivery, $subCategory , $userId ) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->brand = $brand;
        $this->model = $model;
        $this->category = $category;
        $this->size = $size;
        $this->price = $price;
        $this->condition = $condition;
        $this->available = $available;
        $this->userId = $userId;
        $this->available_for_delivery = $available_for_delivery;
        $this->subCategory = $subCategory;
    }
    
    public function __constructer($id) {
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

    public function isAvailableForDelivery(){
        return $this->available_for_delivery;
    }

    public function getSubcategory() {
        return $this->subCategory;
    }

    public function getId() : int {
        return $this->id;
    }

    public function getUserId() : int {
        return $this->userId;
    }

    public function getName() : string {
        return $this->name;
    }

    public function getDescription() : string {
        return $this->description;
    }

    public function getSize() {
        return $this->size;
    }

    public function getCategoryId() : string {
        return $this->category;
    }

    public function getPrice() : float {
        return $this->price;
    }

    public function getConditionId() : string {
        return $this->condition;
    }

    public function getAvailable() : bool {
        return $this->available;
    }

    public function getBrand(){
        return $this->brand;
    }

    public function getModel() : int {
        return $this->model;
    }

}   
?>

