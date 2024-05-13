<?php
session_start();

require_once '../db_handler/DB.php';
$db = new Database("../database/database.db");

$selectedItems = json_decode($_POST["selectedItems"], true);
$table = $_POST["table"];

foreach($selectedItems as $parameter) {
    $db->deleteParameterAdmin($table, $parameter);
}

echo "success";

?>