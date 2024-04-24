
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
    public $userId;
    public $photo_img_col;

    public function __construct($id, $name, $description, $brand, $category, $price, $condition, $available, $userId , $photo_img_col) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->brand = $brand;
        $this->category = $category;
        $this->price = $price;
        $this->condition = $condition;
        $this->available = $available;
        $this->userId = $userId;
        $this->photo_img_col = $photo_img_col;
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

    public function getUserId() : int {
        return $this->userId;
    }

    public function getName() : string {
        return $this->name;
    }

    public function getDescription() : string {
        return $this->description;
    }

    public function getCategory() : string {
        return $this->category;
    }

    public function getPrice() : float {
        return $this->price;
    }

    public function getCondition() : string {
        return $this->condition;
    }

    public function getAvailable() : bool {
        return $this->available;
    }

    public function getPhoto(){
        return $this->photo_img_col;
    }

    public function getBrand(){
        return $this->brand;
    }

    public function getId(){
        return $this->id;
    }
}


?>

