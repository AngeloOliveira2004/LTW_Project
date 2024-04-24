<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Item page</title>
    <link href="../../css/itempage.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
</head>
    <body>
        <?php
            include 'header.php';
        ?>

        <div class="item-container">
        <?php
        require_once '../../db_handler/DB.php';

        $db = new Database();
        
        $randomItems = $db->getXRandItems(10);
        
        foreach ($randomItems as $item) {

            $name = $item->getName();
            $price = $item->getPrice();
            $photo = $item->getPhoto();
            $brand = $item->getBrand();
            
            if($photo == null)
                $photo = "assets/error.png";
            else
                $photo = "data:image/jpeg;base64," . base64_encode($photo);
        
            echo "<div class='item'>
                    <a href='templates/itempage.php?item={$item->getId()}'><img src='$photo' alt='$name'></a>
                    <h3>$name</h3>
                    <p>Price: $price</p>
                    <p>Brand: $brand</p>
                </div>";
            
        }
    ?>
        </div>





    <?php
        include 'footer.php';
    ?>
    
    </body>
</html>