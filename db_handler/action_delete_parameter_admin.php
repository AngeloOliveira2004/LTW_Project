<?php
session_start();

require_once '../db_handler/DB.php';
$db = new Database("../database/database.db");

$selectedItem = $_POST["itemName"];
$table = $_POST["table"];

$db->deleteParameterAdmin($table, $selectedItem);

echo "success";

?>