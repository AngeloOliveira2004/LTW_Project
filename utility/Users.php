<?php

class User {
    // Properties (attributes)
    public $Id;
    public $Username;
    public $Email;
    public $PasswordHash;
    public $FirstName;
    public $LastName;
    public $Address;
    public $PhoneNumber;

    // Constructor with all attributes
    public function __construct($Id, $Username, $Email, $PasswordHash, $FirstName, $LastName, $Address, $PhoneNumber) {
        $this->Id = $Id;
        $this->Username = $Username;
        $this->Email = $Email;
        $this->PasswordHash = $PasswordHash;
        $this->FirstName = $FirstName;
        $this->LastName = $LastName;
        $this->Address = $Address;
        $this->PhoneNumber = $PhoneNumber;
    }

    // Method to display user details
    public function displayDetails() {
        echo "Id: " . $this->Id . "<br>";
        echo "Username: " . $this->Username . "<br>";
        echo "Email: " . $this->Email . "<br>";
        echo "PasswordHash: " . $this->PasswordHash . "<br>";
        echo "First Name: " . $this->FirstName . "<br>";
        echo "Last Name: " . $this->LastName . "<br>";
        echo "Address: " . $this->Address . "<br>";
        echo "Phone Number: " . $this->PhoneNumber . "<br>";
    }
}

?>
