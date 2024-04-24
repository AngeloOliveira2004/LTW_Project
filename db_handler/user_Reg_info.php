<?php 
declare(strict_types = 1);
require_once('db_handler/connection.php');

function register_user($dbh, $Id, $username, $email, $password_hash, $first_name, $last_name, $address, $phone_number) {
    $query = $dbh->prepare('INSERT INTO Users (Id, Username, Email, PasswordHash, FirstName, LastName, Address, PhoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $query->execute([$Id, $username, $email, $password_hash, $first_name, $last_name, $address, $phone_number]);
}

function verify_user(PDO $dbh, string $email, string $password){
    $stmt = $dbh->prepare("SELECT * FROM Users WHERE Email = :email");

    $stmt->execute([':email' => $email]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['PasswordHash'])) {
        return $user; 
    } else {
        return null; 
    }
}