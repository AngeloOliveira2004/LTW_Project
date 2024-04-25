<?php 
declare(strict_types = 1);

session_start();

require_once(__DIR__ . '/connection.php');
require_once(__DIR__ . '/user_Reg_info.php');

$db = new DB();
$dbh = $db->get_database_connection();



$usr = new User($Id, $_POST['username'], $_POST['email'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['address'], $_POST['phonenumber']);
register_user($dbh, $Id, $usr);
$usr->displayDetails();

header("Location: ../pages/homepage.php");
