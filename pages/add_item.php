<?php 

require_once '../db_handler/DB.php';
require_once '../db_handler/Item.php';

$db = new Database("../database/database.db");
$allItems = $db->getItems();

$title = $_POST['title'];
$category = $_POST['category'];
$subCategory = $_POST['subCategory'];
$description = $_POST['description'];
$price = $_POST['price'];
$available_for_delivery = $_POST['negociavel'];
$tamanho = $_POST['tamanho'];
$marca = $_POST['marca'];
$estado = $_POST['estado'];
$model = $_POST['model'];
$numberOfImages = $_POST['imagesSizes']; 

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

$db->insertItem($title , $description, $marca, null , $category, $tamanho, $price, $estado, true,$available_for_delivery, $subCategory, $numberOfImages, 1);

?>
