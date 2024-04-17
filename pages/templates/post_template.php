<?php

    require_once '../../db_handler/DB.php';

    $db = new Database();

    $items = $db->getItems();

    $item = $items[0];

    function generate_item_listing($item) {
        // Initialize the listing HTML
        $listing = '<div class="item-listing">';
        
        // Display the item name
        $listing .= '<h2>' . $item['name'] . '</h2>';
    
        // Display the item price
        $listing .= '<p>Price: $' . number_format($item['price'], 2) . '</p>';
    
        // Check if the item has a photo
        if (!empty($item['photo_img_col'])) {
            // Display the item photo
            $listing .= '<img src="data:image/jpeg;base64,' . base64_encode($item['photo_img_col']) . '" alt="Item Photo">';
        } else {
            // If no photo is available, display a placeholder
            $listing .= '<div class="placeholder-photo">No Photo Available</div>';
        }
    
        // Close the listing HTML
        $listing .= '</div>';
    
        return $listing;
    }

    $item_listing = generate_item_listing($item);


echo $item_listing;

?>
