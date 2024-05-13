<?php
session_start();

require_once '../db_handler/DB.php';
$db = new Database("../database/database.db");

$parameter = $_POST["newItem"];
$table = $_POST["table"];

$db->addParameterAdmin($table,$parameter);

echo "success";

?>