<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_POST['csrf']) || $_SESSION['csrf'] !== $_POST['csrf']) {
        header("Location: ../pages/homepage.php");
        exit();
    }
}

$message = trim($_POST["message"]);
$rating = floatval($_POST["rating"]);
$userReviewed = $_POST["userReviewed"];

require_once '../db_handler/DB.php';
$db = new Database("../database/database.db");

$db->saveReviewsDb($rating,$message,$_SESSION['userId'],$userReviewed);

echo "Review sent successfully";

?>