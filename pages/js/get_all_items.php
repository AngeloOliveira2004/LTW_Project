<?php
    require_once '../../db_handler/DB.php';

    $database = new Database();
    $items = $database->getItems();

    $itemsArray = [];
    foreach ($items as $item) {
        $itemsArray[] = [
            $item->getId(),
            $item->getName(),
            $item->getDescription(),
            $item->getBrand(),
            $item->getCategory(),
            $item->getPrice(),
            $item->getCondition(),
            $item->getAvailable(),
            $item->getUserId(),
            $item->getPhoto()
        ];
    }

    $jsonItems = json_encode($itemsArray);

    echo $jsonItems;

    
?>
