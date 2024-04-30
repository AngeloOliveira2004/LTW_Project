<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <title>Document</title>
</head>
<body>
    <?php
        include 'templates/header.php';
    ?>

    <h1>Wishlist</h1>
    <section id = "banner-conatainer">
        
    </section>
    <h3>sort  by</h3>
    <select name="sorting" id="sorting">
        <option value="on sale">on sale</option>
        <option value="recently added">recently added</option>
        <option value="recently added">Alphabetical</option>
        <option value="recently added">Price: Low to High</option>
        <option value="recently added">Price: High to Low</option>
    </select>
    <?php
        // wishlist.php

        // Verifica se o cookie "wishlist" existe
        if (isset($_COOKIE['wishlist'])) {
            $wishlistItems = explode(',', $_COOKIE['wishlist']);
            
            // Exibe os itens da wishlist
            foreach ($wishlistItems as $itemId) {
                // Aqui você pode consultar o banco de dados para obter informações sobre cada item com o ID fornecido
                // Exemplo: exibir o nome do item
                echo "<p>ID do item na wishlist: $itemId</p>";
            }
        } else {
            echo "<p>Nenhum item adicionado à wishlist</p>";
        }
    ?>

     <?php
        include 'templates/footer.php';
    ?>
</body>
</html>
