<?php
    require_once '../../db_handler/DB.php';

    $database = new Database('../../database/database.db');
    $items = $database->getItems();

    $itemsArray = [];
    foreach ($items as $item) {
        $itemsArray[] = [
            $item->getId(),
            $item->getName(),
            $item->getDescription(),
            $item->getBrand(),
            $item->getCategoryId(), 
            $item->getSize(), 
            $item->getPrice(),
            $item->getConditionId(), 
            $item->getAvailable(),
            $item->isAvailableForDelivery(), 
            $item->getSubCategory(), 
            $item->getNumberOfImages(),
            $item->getUserId(),
        ];
    }

    $jsonItems = json_encode($itemsArray);

    echo $jsonItems;
?>
