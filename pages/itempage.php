<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Item page</title>
        <link href="../../css/itempage.css" rel="stylesheet">
        <link
            href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
            rel="stylesheet">
        <script src="js/itempage.js"></script>
        <link rel="shortcut icon" href="#">
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
                $userId = $item->getUserId();
                $number_of_photos = $item->getNumberOfImages();
                

                $user_details = $db->getUserById($userId);
                $user_username = $user_details->getUsername();
                $user_phonenumber = $user_details->getPhoneNumber();
                $user_email = $user_details->getEmail();

                $Reviews = $db->getReviewByReviewedUserId($userId);

                $reviewsCount = count($Reviews);

                if($reviewsCount == 0){
                    $average = 0;
                }else{
                    $average = number_format(array_reduce($Reviews, function ($carry, $review) {return $carry + $review->getRating();}, 0) / $reviewsCount,2);
                }

            ?>


            <section class="image_section">
                <div class="main_image_container">
                    <img src="../assets/items/<?= $item->getId()?>-1.png"
                        class="<?= $item->getId() . '-' . $item->getNumberOfImages() ?>" alt="<?= $name?>"
                        id="item_image">
                </div>
                <div class="preview_images_container">
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


            <section class="description_and_rest_section">
                <div class="item_details">
                    <p class="Item_Category">
                        <?= 
                            require_once '../db_handler/DB.php';

                            $db = new Database("../database/database.db");
                            
                            $categoryId = $item->getCategoryId(); 
                            
                            $category = $db->getCategoryById($categoryId);
                            
                            $categoryName = $category->getName();
                            
                            $categoryName = preg_replace('/^\d+/', '', $categoryName);
                            

                            echo $categoryName;
                        ?>
                    </p>
                    <p class="Item_Brand"> <?= $brand ?></p>
                    <p> <?= $item->getSubcategory() ?></p>

                    <?php if ($item->isAvailableForDelivery()): ?>
                    <img src="../assets/local_shipping_FILL0_wght400_GRAD0_opsz24.png" alt="shipping" class="shipping">
                    <?php else: ?>
                    <img src="../assets/no_shipping.png" alt="no shipping" class="shipping">
                    <?php endif; ?>
                </div>
                <div class="Item_Description_div">
                    <p class="Item_Description">Descrição</p>
                    <p class="Item_Description_Text"><?= $item->getDescription() ?></p>
                </div>
            </section>

            <section class="contact_user_section">
                <div class="user_info" id="user_info" data-user-id="<?=$user_details->getId() ?>">
                    <div class="user_image_container">
                        <img src="../assets/users/<?= $user_details->getId() ?>.png" alt="<?= $user_username ?>"
                            id="user_image">
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
                <button id="message_button" class="message_button">Enviar Mensagem</button>
            </section>


            <section class="title_price_section">
                <div class="title_price_section_box" id="item-id" data-item-id="<?= $item->getId() ?>">
                    <div class="item_details">
                        <p class="Item_name"> <?= $name ?></p>
                        <p class="Item_Price"> <?= $price ?> EUR</p>
                    </div>
                    <div class="button_container">
                        <input type="text" placeholder="Propor Outro Preço" class="price_input">
                        <button class="propose_button">Propor Preço</button>
                        <form class="shoppingcart" action="../../db_handler/action_shoppingcart.php" method="post">
                            <input type="hidden" name="itemId" value="<?= $item->getId() ?>">
                            <button class="checkout">
                                Adicionar ao carrinho?
                                <img src="../assets/cart.png" class="shopping_cart" alt="shopping_cart">
                            </button>
                        </form>
                    </div>
                    <i class="fa-regular fa-heart"></i>
                </div>

            </section>


            <section class="vendedor_section">
                <img src="../assets/users/<?= $user_details->getId() ?>.png" alt="<?= $user_username ?>"
                    id="user_image">
                <div class="user_details">
                    <p class="user_name"><?= $user_username ?></p>
                    <div class="Averages">

                        Average rating: <?= $average ?>
                        <span class='stars' style='--rating: $rating;'></span> <br>
                        <?php
                            $icon = "";
                            $message = "";  
                            if($average == 0){
                                $icon = "😐"; 
                                $message = "This user has no reviews yet";
                            }elseif ($average > 4) {
                                $icon = "😊"; 
                                $message = "This user has had really positive reviews";
                            } elseif ($average >= 2.5 && $average <= 3.99) {
                                $icon = "😐"; 
                                $message = "This user's reviews are neutral";
                            } else {
                                $icon = "😞"; 
                                $message = "This user's reviews are negative";
                            }
                            echo "Reviews: " . $icon;
                            echo "<br>";
                            echo $message;
                        ?>
                    </div>
                </div>
            </section>


            <section class="location_section">
                <?= $user_details->getAddress() ?>
            </section>

        </section>


        <p class="Items_From_The_Same_User">Other Items from the same User:</p>
        <div class="line"></div>
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


        <p class="review_text">Leave a review to this user</p>
        <div class="line"></div>
        <form class="form_review" id="reviewForm" method="post">
            <input type="hidden" name="userReviewed" value="<?php echo $userId; ?>">
            <label for="message" class="label_message">Message:</label>
            <textarea id="message" class="review_message" name="message" rows="4" cols="50"></textarea>

            <label for="rating" class="label_message">Rating (0 - 5.0):</label>
            <input type="number" class ="rating_number" id="rating" name="rating" step="0.1" min="0" max="5.0" required>

            <input type="submit" class="submit_button" value="Submit">
        </form>

        <?php
        include 'templates/footer.php';
        ?>

    </body>

</html>