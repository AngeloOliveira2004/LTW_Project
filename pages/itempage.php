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
    </head>

    <body>
        <?php
            include 'templates/header.php';
        ?>x

        <div class="item-container">
            <?php
        
        require_once '../db_handler/DB.php';

        $db = new Database("../database/database.db");

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
        ?>
            <nav class='item'>

                <section class="image_section">
                    <button>
                        seta para a direita
                    </button>
                    <img src='../assets/items/<?= $item->getId()?>.png' alt='<?= $name ?>' id="item_image">
                    <button>
                        seta para a esquerda
                    </button>
                </section>

                <section class="description_and_rest_section">
                    <div class="item_details">
                        <p>Categoria: <?= $item->getCategoryId() ?></p>
                        <p>Marca: <?= $brand ?></p>
                        <p>Subcategoria: <?= $item->getSubcategory() ?></p>
                        <p>Disponível para entrega: <?= $item->isAvailableForDelivery() ? 'Sim' : 'Não' ?></p>
                    </div>
                    <p>Descrição</p>
                    <p><?= $item->getDescription() ?></p>
                </section>

                <section class="title_price_section">
                    <p>Nome: <?= $name ?></p>
                    <p>Preço: <?= $price ?> EUR</p>

                    <button>Send Message</button>

                    <span id="user_phonenumber"><?= $user_phonenumber ?></span>
                    <button id="reveal-num-button">Reveal Number</button>
                </section>

                <section class="vendedor_section">
                    <img src="../assets/users/<?= $user_details->getId() ?>.png" alt="<?= $user_username ?>"
                        id="user_image">
                    <p>Utilizador</p>
                    <p><?= $user_username ?></p>
                </section>

                <section class="location_section">
                    <button>
                        Add location
                    </button>
                </section>
            </nav>
        </div>





        <?php
        include 'templates/footer.php';
    ?>

    </body>

</html>