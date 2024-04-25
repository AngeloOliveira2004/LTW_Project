<?php
declare(strict_types=1);

session_start();

require_once(__DIR__ . '/connection.php');
require_once(__DIR__ . '/user_Reg_info.php');

$db = new DB();
$dbh = $db->get_database_connection();


if(verify_user($dbh, $_POST['email'], $_POST['password'])){
    $_SESSION['email'] = $_POST['email'];
    header('Location: ../pages/homepage.php');
}else{
    header('Location: ../pages/userReg.php');
}