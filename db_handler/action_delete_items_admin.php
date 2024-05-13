<?php

    session_start();

    $itemId = $_POST['itemId'];

    require_once '../db_handler/DB.php';
    require_once '../db_handler/Item.php';

    $db = new Database("../database/database.db");

    $db->deleteItem($itemId);

    echo "success";

?>
