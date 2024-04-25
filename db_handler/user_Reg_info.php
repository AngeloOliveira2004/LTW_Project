<?php 
declare(strict_types = 1);
require_once(__DIR__ . '/connection.php');
require_once(__DIR__ . '/Users.php');

function register_user($dbh, $Id, User $user): void {
    $query = $dbh->prepare('INSERT INTO Users (Username, Email, PasswordHash, FirstName, LastName, Address, PhoneNumber) VALUES ( ?, ?, ?, ?, ?, ?, ?)');
    $query->execute(array( $user->getUsername(), $user->getEmail(), $user->getPasswordHash(), $user->getFirstName(), $user->getLastName(), $user->getAddress(), $user->getPhoneNumber()));
    header('Location: homepage.php');
}


function verify_user(PDO $dbh, string $email, string $password){
    $stmt = $dbh->prepare("SELECT * FROM Users WHERE Email = :email");
    $stmt->execute([':email' => $email]);

    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['PasswordHash'])) {
        return $user; 
    } else {
        return null; 
    }
}
?>
