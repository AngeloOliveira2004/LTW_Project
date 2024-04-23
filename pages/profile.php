    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Profile page</title>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="../css/profile.css">
        <script src="js/profile_items.js"></script>
    </head>
    <body>
        <?php
            include 'templates/header.php';
        ?>
        <section class="profile_info">
                <img src="assets/profile/keanu.jpeg" alt="Keanu Reeves">

            <div class="user_details">
                <ul>
                    <li>keanu_reeves_007</li>
                    <li>4.9 stars</li>
                    <li>20 reviews</li>
                </ul>  
            
                <ul>
                    <li>About:</li>
                    <li><img src="assets/profile/location.png" alt="location icon">                                                                                                                     Sacramento, United States</li>
                    <li><img src="assets/profile/clock.png" alt="clock icon"> Last online: 1 day ago</li>
                    <li><img src="assets/profile/product.png" alt="product icon"> Items sold: 5</li>
                </ul>
            </div>  
            <button class="edit_profile"><img src="assets/profile/editpencil.png" alt="pencil"> Edit Profile</button>
        </section>

        <section class="profile_option">
            <ul>
                <li>
                    <a id="listings-link">Listings</a>        
                </li>
                <li>
                    <a id="ratings-link">Ratings</a>
                </li>
            </ul>
        </section>
        <div class="blue-line"></div>
        <span id="item-count">
         <?php
             require_once '../db_handler/DB.php';
     
             $db = new Database();
         
             $Items = $db->getItemByUserId(1);
 
             $ItemCount = count($Items);
 
             echo "<h3>Total items in active listing: $ItemCount</h3>";
         ?>
        </span>
        <div class = "Items" id="items-section">
         <?php
         require_once '../db_handler/DB.php';
     
         $db = new Database();
         
         $Items = $db->getItemByUserId(1);
         
         foreach ($Items as $item) {
     
             $name = $item->getName();
             $price = $item->getPrice();
             $photo = $item->getPhoto();
             $brand = $item->getBrand();
             
             if($photo == null)
                 $photo = "assets/error.png";
             else
                 $photo = "data:image/jpeg;base64," . base64_encode($photo);
         
             echo "<span class='item'>
                     <img src='$photo' alt='$name'>
                     <h3>$name</h3>
                     <p>Price: $price</p>
                     <p>Brand: $brand</p>
                 </span>";
             }
         ?>
        </div>

        <nav id="reviews-count">
         <?php
             require_once '../db_handler/DB.php';
     
             $db = new Database();
         
             $Reviews = $db->getReviewByReviewedUserId(1);
 
             $reviewsCount = count($Reviews);
 
             echo "<h3>Total reviews: $reviewsCount </h3>";
         ?>
        </nav>
        <nav class = "Reviews" id="reviews-section">
         <?php
         require_once '../db_handler/DB.php';
     
         $db = new Database();
         
         $Reviews = $db->getReviewByReviewedUserId(1);
         
         foreach ($Reviews as $review) {

            $rating = $review->getRating();
            $date = $review->getReviewDate();
            $author = $review->getAuthor()->getUsername();
            $comment = $review->getComment();
            $photo = null;


            if($photo == null)
                 $photo = "assets/error.png";
             else
                 $photo = "data:image/jpeg;base64," . base64_encode($photo);

         
             echo "<span class='review'>
                     <img src='$photo' alt='$author'>
                     <h3>$author</h3>
                     <p>Rating: $rating</p>
                     <p>Comment: $comment</p>
                 </span>";
             }
         ?>
         </nav>
        

        <footer>
            <?php
                include 'templates/footer.php';
            ?>
        </footer>
    </body>
    </html>

