<?php 
declare(strict_types = 1);

session_start();

require_once('../database.db');
require_once('db_handler/connection.php');
require_once('db_handler/user_Reg_info.php');

$db = new DB();
$dbh = $db->get_database_connection();

if(isset($_POST['username'], $_POST['email'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['address'], $_POST['phonenumber'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $address = $_POST['address'];
    $phonenumber = $_POST['phonenumber'];

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    try {
        register_user($dbh, $username, $email, $password_hash, $firstname, $lastname, $address, $phonenumber);
        header("Location: ../pages/homepage.php");
        exit(); 
    } catch (PDOException $e) {
        echo "Erro ao inserir usuário: " . $e->getMessage();
    }
} else {
    header("Location: register.php");
    exit();
}
?>
