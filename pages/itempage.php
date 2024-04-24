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
            include 'templates/header.php';
        ?>

        <div class="item-container">
        <?php
        
        require_once '../db_handler/DB.php';

        $db = new Database();

        $itemId = $_GET['item'];

        $item = $db->getItemById($itemId);
        
            $name = $item->getName();
            $price = $item->getPrice();
            $photo = $item->getPhoto();
            $brand = $item->getBrand();
            $user = $item->getUserId();

        $user_details = $db->getUserById($user);
            $user_username = $user_details->getUsername();
            $user_phonenumber = $user_details->getPhoneNumber();
            $user_email = $user_details->getEmail();

            
            if($photo == null)
                $photo = "assets/error.png";
            else
                $photo = "data:image/jpeg;base64," . base64_encode($photo);
        
            echo "<div class='item'>
                    <img src='$photo' alt='$name'></a>
                    <h3>$name</h3>
                    <p>Price: $price</p>
                    <p>Brand: $brand</p>
                    <p>User: $user_username</p>
                    <p>Phone Number: $user_phonenumber</p>
                    <p>Email: $user_email</p>
                </div>";  
        ?>
        </div>





    <?php
        include 'templates/footer.php';
    ?>
    
    </body>
</html>