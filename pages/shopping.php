<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link
            href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
            rel="stylesheet">
        <link rel="stylesheet" href="../css/Shopping.css">
        <title>Cart</title>
    </head>

    <body>
        <?php
        include 'templates/header.php';
        ?>

        <h1>Shopping Cart</h1>
        <section id="banner-conatainer">

        </section>
        <section class="option">
            <h3>sort by</h3>
            <select name=" sorting" id="sorting">
                <option value="on sale">on sale</option>
                <option value="recently added">recently added</option>
                <option value="recently added">Alphabetical</option>
                <option value="recently added">Price: Low to High</option>
                <option value="recently added">Price: High to Low</option>
            </select>
        </section>

        <?php
        require_once (__DIR__ . '/../db_handler/DB.php');
        require_once (__DIR__ . '/../db_handler/itemmove.php');

        session_start();
        $dB = new DB();
        $db = new Database("../database/database.db");

        $user = $_SESSION['userId'];
        $dbh = $dB->get_database_connection(); // Obtenha a conexão com o banco de dados aqui
        
        $ShoppingItemsIds = get_cart_items_ids($dbh, $user);

        // Recupere os detalhes dos itens da tabela de itens com base nos IDs da Shopping
        $ShoppingCartItemsDetails = array();
        foreach ($ShoppingItemsIds as $itemId) {
            $itemDetails = $db->getItemById($itemId);
            if ($itemDetails) {
                $ShoppingCartItemsDetails[] = $itemDetails;
            }
        }
        ?>

        <section class="cart_body">
            <div class="ShoppingCart-items">
                <?php foreach ($ShoppingCartItemsDetails as $item): ?>
                <div class="item">
                    <?php
            $name = $item->getName();
            $price = $item->getPrice();
            $brand = $item->getBrand();

            $itemImagePath = "../assets/items/{$item->getId()}-1.png";
            $errorImagePath = "../assets/items/error.png";

            if (file_exists($itemImagePath)) {
                $imageSrc = $itemImagePath;
            } else {
                $imageSrc = $errorImagePath;
            }
            ?>
                    <a href="itempage.php?item=<?= $item->getId() ?>">
                        <img src="<?= $imageSrc ?>" alt="<?= $name ?>">
                    </a>
                    <h3><?= $name ?></h3>
                    <p>Price: <?= $price ?></p>
                    <p>Brand: <?= $brand ?></p>
                    <input type="hidden" name="itemId" value="<?= $item->getId() ?>">
                    <button class="Remove_cart" data-item-id="<?= $item->getId() ?>">Remove
                    </button>
                </div>
                <?php endforeach; ?>
            </div>

            <section class="checkout zone">
                <span>checkout</span>
                <span>price</span>


            </section>
        </section>

        <?php
        include 'templates/footer.php';
        ?> <script src="js/shopping_cart.js">
        </script>
    </body>

</html>