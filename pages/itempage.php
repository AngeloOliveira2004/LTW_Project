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

        <section class="item-container">

            <?php
                require_once '../db_handler/DB.php';

                $db = new Database("../database/database.db");

                $itemId = $_GET['item'];

                $item = $db->getItemById($itemId);
            
                $name = $item->getName();
                $price = $item->getPrice();
                $brand = $item->getBrand();
                $user = $item->getUserId();
                $number_of_photos = $item->getNumberOfImages();
                

                $user_details = $db->getUserById($user);
                $user_username = $user_details->getUsername();
                $user_phonenumber = $user_details->getPhoneNumber();
                $user_email = $user_details->getEmail();

            ?>
        
            
            <section class="image_section">
                <div class="main_image_container">
                    <img src="../assets/items/<?= $item->getId()?>-1.png" class="<?= $item->getId() . '-' . $item->getNumberOfImages() ?>" alt="<?= $name?>" id="item_image">
                </div>
                <div class = "preview_images_container">
                    <button id="prev-image">&larr;</button>
                    <div class="preview_images">
                        <?php
                            for ($i = 1; $i <= $item->getNumberOfImages(); $i++) {
                                echo '<img src="../assets/items/' . $item->getId() . '-' . $i . '.png" class="prev-image'. $i . '" alt="' . $name . '" id="preview_image">';
                            }
                        ?>
                    </div>
                    <button id="next-image">&rarr;</button>
                </div>
            </section>

            
            <section class = "description_and_rest_section">
                <div class = "item_details">
                    <p class = "Item_Category"> 
                        <?= 
                            require_once '../db_handler/DB.php';

                            $db = new Database("../database/database.db");
                            
                            $categoryId = $item->getCategoryId(); 
                            
                            $category = $db->getCategoryById($categoryId);
                            
                            $categoryName = $category->getName();

                            $categoryName = $category->getName();
                            
                            $categoryName = preg_replace('/^\d+/', '', $categoryName);


                            echo $categoryName;
                        ?>
                    </p>
                    <p class = "Item_Brand"> <?= $brand ?></p>
                    <p> <?= $item->getSubcategory() ?></p>

                    <?php if ($item->isAvailableForDelivery()): ?>
                        <img src="../assets/local_shipping_FILL0_wght400_GRAD0_opsz24.png" alt="shipping" class="shipping">
                    <?php else: ?>
                        <img src="../assets/no_shipping.png" alt="no shipping" class="shipping">
                    <?php endif; ?>
                </div>
                <div class = "Item_Description_div">
                    <p class = "Item_Description">Descrição</p>
                    <p class = "Item_Description_Text"><?= $item->getDescription() ?></p>
                </div>
            </section>

            <section class="contact_user_section">
    <div class="user_info">
        <div class="user_image_container">
            <img src="../assets/users/<?= $user_details->getId() ?>.png" alt="<?= $user_username ?>" id="user_image">
        </div>
        <div class="user_details">
            <p class="username"><?= $user_details->getUsername() ?></p>
            <p class="last_online">last time online</p>
            <div class="phone_container">
                <img src="../assets/phone.png" alt="Phone Icon" class="phone_icon">
                <p class="phone_number"><?= $user_phonenumber ?></p>
            </div>
        </div>
    </div>
    <button id= "message_button" class="message_button">Enviar Mensagem</button>
</section>


            <section class="title_price_section">
                <div class="title_price_section_box">
                    <div class="item_details">
                        <p class="Item_name"> <?= $name ?></p>
                        <p class="Item_Price"> <?= $price ?> EUR</p>
                    </div>
                    <div class="button_container">
                        <input type="text" placeholder="Propor Outro Preço" class="price_input">
                        <button class="propose_button">Propor Preço</button>
                        <button class = "checkout"> 
                            Adicionar ao carrinho?
                            <img src="../assets/cart.png" class ="shopping_cart" alt="shopping_cart">
                        </button>
                    </div>
                    <i class="fa-regular fa-heart" data-item-id="<?= $item->getId() ?>"></i>
                </div>
                
            </section>


            <section class = "vendedor_section">
                <img src="../assets/users/<?= $user_details->getId() ?>.png" alt="<?= $user_username ?>" id="user_image">
                <div class="user_details">
                    <p class="user_name"><?= $user_username ?></p>
                    <p class="reviews">to be added: reviews</p>
                </div>
            </section>

            <section class = "location_section">
                <?= $user_details->getAddress() ?>
            </section>              
        
        </section>

        <section class="other_items_of_the_user">
    <div class="arrows">
        <button id="prevPage">&larr;</button>
    </div>
    <div class="items_container">
        <?php
        require_once '../db_handler/DB.php';

        $db = new Database("../database/database.db");

        $userItems = $db->getAllUserItems($user_details->getId());

        $itemsPerPage = 5;
        $currentPage = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $startIndex = ($currentPage - 1) * $itemsPerPage;
        $endIndex = $startIndex + $itemsPerPage;

        for ($i = $startIndex; $i < $endIndex && $i < count($userItems); $i++) {
            $item = $userItems[$i];
            $name = $item->getName();
            $price = $item->getPrice();
            $brand = $item->getBrand();

            $itemImagePath = "../assets/items/{$item->getId()}-1.png";
            $errorImagePath = "../assets/items/error.png";
            $imageSrc = file_exists($itemImagePath) ? $itemImagePath : $errorImagePath;
        ?>
        <div class='item'>
            <a href='itempage.php?item=<?= $item->getId() ?>'>
                <img src="<?= $imageSrc ?>" alt='<?= $item->getName() ?>'>
            </a>
            <h3><?= $item->getName() ?></h3>
            <p>Price: <?= $item->getPrice() ?></p>
            <p>Brand: <?= $item->getBrand() ?></p>
        </div>
        <?php
        }
        ?>
    </div>
    <div class="arrows">
        <button id="nextPage">&rarr;</button>
    </div>
</section>


    <?php
        include 'templates/footer.php';
    ?>
    
    </body>
</html>