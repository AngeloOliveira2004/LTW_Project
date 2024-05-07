<?php
require_once (__DIR__ . '/DB.php');

$db = new Database("../database/database.db");

session_start();

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$userId = $_SESSION['userId'];
$username = $_POST['username'];
$email = $_POST['email'];
$address = $_POST['address'];
$phone_number = $_POST['phone-number'];

$db->saveProfileChanges($first_name,$last_name,$username,$email,$address,$phone_number,$userId);

header("Location: ../pages/profile.php");
exit();

?>
