<?php
session_start();

if(isset($_POST['itemId']) && isset($_POST['price']) && isset($_POST['type'])){
    $itemId = $_POST['itemId'];
    $newPrice = $_POST['price'];
    $type = $_POST['type'];

    if($type == "reject"){
        require_once 'DB.php';
        require_once 'Item.php';
        $db = new Database("../database/database.db");
        $db->EliminateItemProposal($itemId,$newPrice);
        echo "success";
    } else if($type == "accept"){
        require_once 'DB.php';
        require_once 'Item.php';
        $db = new Database("../database/database.db");
        $db->UpdateItemPrice($itemId,$newPrice);
        $db->EliminateItemProposal($itemId,$newPrice);
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "error: missing parameters";
}


?>