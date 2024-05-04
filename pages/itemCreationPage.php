<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ItemCreationPage</title>

    <link href="../../css/itemCreation.css" rel="stylesheet">
    <script src="js/itemCreation.js"></script>
    
</head>

<body>  
    <?php
        include 'templates/header.php';

        require_once '../db_handler/DB.php';

        $db = new Database("../database/database.db");

        $allItems = $db->getItems();

        $categoryCounts = array();
        foreach ($allItems as $item) {
            $category = $item->getCategoryId();
            if (!isset($categoryCounts[$category])) {
                $categoryCounts[$category] = 0;
            }
            $categoryCounts[$category]++;
        }

        arsort($categoryCounts);

        $topCategories = array_slice($categoryCounts, 0, 7);



        foreach ($topCategories as $category => $count) {
            $catName = $db->getCategoryById($category);
            $topCategoriesNames[] = $catName;
        }

        $topCategories = $topCategoriesNames;

        $subCategoryCounts = array();
        foreach ($allItems as $item) {
            $subCategory = $item->getSubcategory();
            if (!isset($subCategoryCounts[$subCategory])) {
                $subCategoryCounts[$subCategory] = 0;
            }
            $subCategoryCounts[$subCategory]++;
        }

        arsort($subCategoryCounts);

        $topSubCategories = array_slice($subCategoryCounts, 0, 7);
    ?>
    

    <p class="publish">Publicar Anúncio</p>
    <div class="ItemCreation">

    <section class="Item-Title-And-Categories">
        <p>Primeiro, introduz um título*</p>
        <p class="box_title">Tenta ser o mais descritivo e apelativo possível</p>
        <input type="text" class="Item-Title">
        
        <div class="category-container">
            <p class="Category_choice">Escolha até 3 Categorias</p>
            <input type="text" placeholder="Escolhe uma categoria?" class="search_category">
            <div class="suggestions">
                <?php
                foreach ($topCategories as $category => $count) {
                    echo "<div class='category-option' value='$category'>$category</div>";
                }

                foreach ($topCategories as $category => $count) {
                    echo "<div class='category-option' value='$category'>$category</div>";
                }

                foreach ($topCategories as $category => $count) {
                    echo "<div class='category-option' value='$category'>$category</div>";
                }
                ?>
            </div>
        </div>

        <p class="Sub_Category_choice">Escolha até 3 Sub-Categoria</p>
        <input type="text" placeholder="Escolhe uma categoria?" class="sub_search_category">
        <div class="sub_suggestions">
            <?php
            foreach ($topSubCategories as $category => $count) {
                echo "<div class='category-option' value='$category'>$category</div>";
            }
            ?>
        </div>
    </section>

        <section class="Item-Images">
            <p class="images">Imagens</p>
            <p class="images_text">A primeira imagem é a foto principal do teu anúncio. Podes inserir outras 15</p>
            <?php for ($i = 1; $i <= 15; $i++): ?>
                <input class="image_inputer" type="file" id="image<?= $i ?>" name="image<?= $i ?>" accept="image/*">
                <label id="image_icon<?= $i ?>" class="image_icon" for="image<?= $i ?>">
                    <img src="../assets/camera.png" alt="Camera Icon" id="selected_image<?= $i ?>" class="selected_image<?= $i ?>">
                </label><br>
            <?php endfor; ?>
        </section>

        <section class="Item-Description">
            <p>Introduza uma boa descrição do item!*</p>
            <input type="text" class="Item-Description">
            <p>Introduza no mínimo 10 caracteres e no máximo 1000</p>
        </section>

        <section class="Item-Price-Trade">
            <p class="Preço">Preço:</p>
            <input type="text" class="Preço">
            <button class="Negociável">Negociável</button>
        </section>

        <section class="Additional-Info">
            <p>Tamanho</p>
            <ul class="sizes"></ul>

            <p>Marca*</p>
            <input type="text" class="Marca">

            <p>Modelo</p>
            <input type="text" class="Modelo">

            <p>Estado*</p>
            <input type="text" class="Estado">
        </section>

        <section>
            <p>Pré Visualizar</p>
            <button class ="Publicar">Publicar anúncio</button>
        </section>
        </div>
        <?php
            include 'templates/footer.php';
        ?>

</body>
</html>
