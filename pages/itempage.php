<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Item page</title>
    <link href="../../css/itempage.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <script src="js/itempage.js"></script>
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
         
        ?>
            <nav class='item'>
                <img src='../assets/items/<?= $item->getId()?>.png' alt='<?= $name ?>' id="item_image">
                <section class="right-side-bar">    
                <h3><?= $name ?></h3>
                    <ul>
                        <li><?= $price ?> EUR</li>
                        <li>Brand: <?= $brand ?></li>
                        <div class="rectangle">
                          <li><img src='../assets/users/<?= $user?>.png'><i>@<?= $user_username ?></i></li>
                          <li>
                            <span id="user_phonenumber"><?= $user_phonenumber ?></span>
                             <button id="reveal-num-button">Reveal Number</button>
                          </li>
                          <li>
                            <span id="user_email"><?= $user_email ?></span>
                             <button id="reveal-email-button">Reveal Email</button>
                          </li>
                        </div>
                    </ul>
                </section>
            </nav>
        </div>





    <?php
        include 'templates/footer.php';
    ?>
    
    </body>
</html>