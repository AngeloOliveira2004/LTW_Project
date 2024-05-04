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

        $topCategoriesNames = array(); 
        foreach ($topCategories as $category => $count) {
            $catName = $db->getCategoryNameById($category);
            if($catName != null)
                $topCategoriesNames[$catName] = $count;
        }


        $topCategories = $topCategoriesNames;

       
    ?>


        <p class="publish">Publicar Anúncio</p>
        <div class="ItemCreation">

            <section class="Item-Title-And-Categories">
                <p class="title">Primeiro, introduz um título*</p>
                <p class="box_title">Tenta ser o mais descritivo e apelativo possível</p>
                <input type="text" class="Item-Title">

                <div class="words-details">
                    <p>Introduz pelo menos 1 caractér</p>
                    <p class="word-count">0/50 letras</p>
                </div>

                <div class="category-container">
                    <p class="Category_choice">Escolha uma Categorias</p>
                    <input type="text" placeholder="Escolhe uma categoria?" class="search_category">
                    <div class="suggestions">
                        <?php
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
            $selectedCategoryId = isset($_POST['selected_category_id']) ? $_POST['selected_category_id'] : null;

            $topSubCategories = array();
    
            if ($selectedCategoryId !== null) {
                $subCategories = $db->getSubCategoriesByParent($selectedCategoryId);
    
                foreach ($subCategories as $subcategory) {
                    $topSubCategories[$subcategory['Name']] = $subcategory['Count'];
                }
            } 

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
                    <img src="../assets/camera.png" alt="Camera Icon" id="selected_image<?= $i ?>"
                        class="selected_image<?= $i ?>">
                </label><br>
                <?php endfor; ?>
            </section>

            <section class="Item-Description">
                <p class="item-description">Introduza uma boa descrição do item!<span>*</span></p>
                <textarea class="description-text"
                    placeholder="Introduza no mínimo 10 caracteres e no máximo 1000"></textarea>
                <div class="word-details">
                    <p class="min_words">Introduz pelo menos 10 caracteres</p>
                    <p class="word-counter">0/200 palavras</p>
                </div>
            </section>


            <section class="Item-Price-Trade">
                <p class="Preço">Preço (EUR) :</p>
                <input type="text" class="Preço_">
                <div class="toggle-button-wrapper">
                    <p class="Negociável"> Negociável: </p>
                    <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider round"></span>
                    </label>
                </div>
            </section>



            <section class="Additional-Info">
                <?php
                require_once '../db_handler/DB.php';

                $db = new Database("../database/database.db");

                $allSizes = $db->getSizes();
                $allModels = $db->getConditions();


            ?>

                <p class="size">Tamanho</p>
                <input type="text" class="Tamanho">
                <ul class="sizes">
                    <?php 
                    foreach ($allSizes as $size) {
                        echo "<li class='size_list' value='{$size->getId()}'>{$size->getName()}</li>";
                    }
                ?>
                </ul>

                <p id="brand">Marca*</p>
                <input type="text" class="Marca">

                <p class="condition">Estado*</p>
                <input type="text" class="Estado">
                <ul class="conditions">
                    <?php 
                    foreach ($allModels as $model) {
                        echo "<li class='condition_list' value='{$model->getId()}'>{$model->getName()}</li>";
                    }
                ?>
                </ul>
            </section>

            <section>
                <div class="pre_visualizar_publicar_section">
                    <p class="pre_visualizar">Pré Visualizar</p>
                    <button class="Publicar">Publicar anúncio</button>
                </div>
            </section>

        </div>
        <?php
            include 'templates/footer.php';
        ?>

    </body>

</html>