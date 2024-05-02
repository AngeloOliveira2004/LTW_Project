<?php
session_start();

if (isset($_POST['message'])) {
    require_once (__DIR__ . '/DB.php');

    $message = $_POST['message'];

    $currentUser = $_SESSION['userId'];

    $receiverUser = $_POST['receiverId'];

    $itemId = $_POST['itemId'];

    $db = new Database("../database/database.db");

    $db->saveMessagesDb($currentUser, $receiverUser, $itemId, $message);

    echo $message;
}
?>
