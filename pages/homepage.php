<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>homepage</title>

    <link href="../css/homepage.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/homepage.js"></script>
    
</head> 
<body>
    <?php
        include 'templates/header.php';
    ?>

    <span class="search_table">
        <input type="text" placeholder="O que Procuras?" class="search_bar"> </input>
            <?php
                require_once '../db_handler/DB.php';

                $db = new Database();

                $allItems = $db->getItems();

                $categoryCounts = array();
                foreach ($allItems as $item) {
                    $category = $item->getCategory();
                    if (!isset($categoryCounts[$category])) {
                        $categoryCounts[$category] = 0;
                    }
                    $categoryCounts[$category]++;
                }

                arsort($categoryCounts);

                $topCategories = array_slice($categoryCounts, 0, 7);

                echo '<select class="category_dropdown">';
                echo '<option value="">Todas as Categorias</option>';
                foreach ($topCategories as $category => $count) {
                    echo "<option value='$category'>$category</option>";
                }
                echo '</select>';
            ?>

        <button class="search_button">
            Pesquisar
            <img src="assets/search-interface-symbol.png" alt="search-icon" class = "search_icon">
        </button>
    </span>
    
    <span class = "Categorias_Principais">
        Categorias Principais
    </span>

    <div class = "Categories">
            <a href="">
        <div class="image-container">
            <img src="assets/carro-removebg-preview.png" alt="car">
            <span>Veihicles</span>
        </div>
        </a>
        <a href="">
        <div class="image-container">
            <img src="assets/bola-removebg-preview.png" alt="ball">
            <span>Sports</span>
        </div>
        </a>
        <a href="">
        <div class="image-container">
            <img src="assets/chair-removebg-preview.png" alt="chair">
            <span>Furniture</span>
        </div>
        </a>
        <a href="">
        <div class="image-container">
            <img src="assets/tshirt.png" alt="tshirt">
            <span>Clothes</span>
        </div>
        </a>
        <a href="">
        <div class="image-container">
            <img src="assets/mobilePhone-removebg-preview.png" alt="mobile phone">
            <span>Mobile Phones</span>
        </div>
        </a>
        <a href="">
        <div class="image-container">
            <img src="assets/computer-removebg-preview.png" alt="computer">
            <span>Technology</span>
        </div>
        </a>
        <a href="">
        <div class="image-container">
            <img src="assets/guitar-removebg-preview.png" alt="guitar">
            <span>Music</span>
        </div>
        </a>
    </div>
    
    <span class = "Buy_From_Brand">
        Compre pela marca
    </span>

    <?php
        require_once '../db_handler/DB.php';

        $db = new Database();

        $allItems = $db->getItems();
        $map = array();

        foreach ($allItems as $item) {
            $map[$item->getBrand()] = 0;
        }

        foreach ($allItems as $item) {
            $map[$item->getBrand()] += 1;
        }
        
        arsort($map);

        $topBrands = array_slice($map, 0, 15    );

        echo "<div class='brands'>";

        foreach ($topBrands as $brand => $value) {
            echo "
                <button>
                    $brand
                </button> ";
        }

        echo "</div>";
    ?>

    <span class = "Feed">
        Posts
    </span>
    
    <div class = "Items" >

    <?php
require_once '../db_handler/DB.php';

$db = new Database();

$randomItems = $db->getXRandItems(10);

foreach ($randomItems as $item) {
    $name = $item->getName();
    $price = $item->getPrice();
    $photo = $item->getPhoto();
    $brand = $item->getBrand();

    if ($photo == null)
        $photo = "assets/error.png";
    else
        $photo = "data:image/jpeg;base64," . base64_encode($photo);
    ?>

    <div class='item'>
        <a href='itempage.php?item=<?= $item->getId() ?>'>
            <img src='../assets/items/<?= $item->getId() ?>.png' alt='<?= $item->getName() ?>'>
        </a>
        <h3><?= $item->getName() ?></h3>
        <p>Price: <?= $item->getPrice() ?></p>
        <p>Brand: <?= $item->getBrand() ?></p>
        <i class="fa-regular fa-heart "></i>

    </div>

    <?php } ?>

    </div>

    <div class = "search-items"> </div>
    
    <?php
        include 'templates/footer.php';
    ?>
    </body>
</html>