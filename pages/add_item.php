<?php 

require_once '../db_handler/DB.php';
require_once '../db_handler/Item.php';

$db = new Database("../database/database.db");
$allItems = $db->getItems();

session_start();

$userId = -1;

if (isset($_SESSION['userId'])) {
    $userId = $_SESSION['userId'];
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $subCategory = filter_input(INPUT_POST, 'subCategory', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $description = filter_input(INPUT_POST, 'description', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $price = filter_input(INPUT_POST, 'price', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $available_for_delivery = filter_input(INPUT_POST, 'negociavel', FILTER_VALIDATE_BOOLEAN);
    $tamanho = filter_input(INPUT_POST, 'tamanho', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $marca = filter_input(INPUT_POST, 'marca', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $estado = filter_input(INPUT_POST, 'estado', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $imagesSizes = filter_input(INPUT_POST, 'imagesSizes', FILTER_VALIDATE_INT);

    $actualCategory = $db->getCategoryIdByName($category);
    if($subCategory != null){
        $actualSubCategory = $db->getSubCategoryIdByName($subCategory);
    }else{
        $actualSubCategory = null;
    }
    $actualCondition = $db->getConditionIdByName($estado);

    echo "Title: $title <br>";
    echo "Category: $category <br>";
    echo "SubCategory: $subCategory <br>";
    echo "Description: $description <br>";
    echo "Price: $price <br>";
    echo "Available for delivery: $available_for_delivery <br>";
    echo "Tamanho: $tamanho <br>";
    echo "Marca: $marca <br>";
    echo "Estado: $estado <br>";
    echo "Number of images: $numberOfImages <br>";

    $db->insertItem($title , $description, $marca, null , $actualCategory, $tamanho, $price, $actualCondition, true,$available_for_delivery, $actualSubCategory, $numberOfImages, $userId);
}


?>
