<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search_page</title>
    <link href="../css/search_page.css" rel="stylesheet">
    <script src="js/search_bar.js"></script>
    
    
</head>
<body>
    <div class = "whole-page">
    <?php
        include 'templates/header.php';

        $searchValue = isset($_GET['search']) ? $_GET['search'] : '';
        $categoryValue = isset($_GET['category']) ? $_GET['category'] : '';

        function isSelected($value, $option) {
            return $value == $option ? 'selected' : '';
        }
    ?>

    <span class="search_table">
        <?php
            require_once '../db_handler/DB.php';

            $db = new Database('../database/database.db');

            $itemNames = $db->getItemsName();

            $itemNamesJson = json_encode($itemNames);
        ?>

        <script>
            var itemNames = <?php echo $itemNamesJson; ?>;
        </script>

        <span class="search_table">

            <div class = "search-box">
                <div class = "row">
                    <input type="text" placeholder="O que Procuras?" class="search_bar"> </input>
                </div>
                
                <div class = "result-box">
                    <ul class="result"> 
                    
                    </ul>
                </div>
            </div>
        
            <?php
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

                $topCategories = array_slice($categoryCounts, 0, 8);
                
                if($categoryValue === 'All' || $categoryValue === '' || $categoryValue === null){
                    echo '<select class="category_dropdown">';
                    echo '<option value="">Todas as Categorias</option>';
                } else {
                    echo '<select class="category_dropdown">';
                    echo '<option value="">Todas as Categorias</option>';
                    echo '<option value="" selected>' .$categoryValue. '</option>';
                }

                foreach ($topCategories as $category => $count) {
                    if($categoryValue === $category){
                        continue;
                    }
                    echo "<option value='$category'>$category</option>";
                }
                
                echo '</select>';
            ?>

                <button class="search_button">
                    Pesquisar
                    <img src="assets/search-interface-symbol.png" alt="search-icon" class = "search_icon">
                </button>
            </span>
        </span>
    
    <div class="filter_section">
        <span class="filter_text" id="filter_image">
            Apenas anúncios com imagens
            <button class="filter_button" id="image_filter">
                A
            </button>
        </span>
        <span class="filter_text" id="filter_delivery">
            Disponível para entrega
            <button class="filter_button" id="delivery_filter">
                A
            </button>
        </span>
       
        <span class="filter_keyword">
            Filtros
        </span>
        
        <div class = "line"></div>

        <select name="marca" id="marca_filter">
            <option value="" class="Marca">Marca</option>
                <?php
                    require_once '../db_handler/DB.php';

                    $db = new Database("../database/database.db");
    
                    $allItems = $db->getItems();
    
                    $brandCounts = array();
                    foreach ($allItems as $item) {
                        $brand = $item->getBrand();
                        if (!isset($brandCounts[$brand])) {
                            $brandCounts[$brand] = 0;
                        }
                        $brandCounts[$brand]++;
                    }
    
                    arsort($brandCounts);
    
                    $topBrands = array_keys(array_slice($brandCounts, 0, 8));
                
                    foreach ($topBrands as $brand) {
                        echo "<option value=\"$brand\" class=\"Marca\">$brand</option>";
                    }
                    ?>
        </select>
        <select name="estado" id="estado_filter">
                <option value="" disabled selected>Estado</option>
                <option value="Any">Qualquer Um</option>
                <option value="Novo">Novo</option>
                <option value="Usado">Usado</option>
        </select>
        <span class = "price">Preço: </span>
        <input type="text" value="0" class="from">
        <input type="text" value="1000" class = "to">
        
    
        <select name="sort" id="sort_filter">
            <option value="">Ordenar por</option>
            <option value="price_asc">Preço (menor para maior)</option>
            <option value="price_desc">Preço (maior para menor)</option>
        </select>
        
        <div class = "current_filters" >

        </div>

    </div>

    <div class = "line"></div>
    
    <div class = "search-items"></div>

    <?php
        include 'templates/footer.php';
    ?>
    </div>
</body>
</html>
