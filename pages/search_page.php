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

            $db = new Database();

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
    
    <span class = "filter_text">
        Apenas anúncios com imagens
        <button class="filter_button" id="image_filter">
            AA
        </button>
    </span>
    <span class = "filter_text">
        Disponível para entrega
        <button class="filter_button" id="delivery_filter">
            AA
        </button>
    </span>


    
    <div class="filter_section">
        <span class="filter_keyword">Filtros</span>
        <div class="filter_dropdown">
            <select name="marca" id="marca_filter">
                <option value="">Marca</option>
            </select>
        </div>
        <div class="filter_dropdown">
            <select name="estado" id="estado_filter">
                <option value="">Estado</option>
            </select>
        </div>

        <div class="filter_dropdown">
            <ul name="preco_filter" id="preco_filter">
                <li>
                    <input type="text" placeholder="De">
                </li>
                <li>
                    <input type="text" placeholder="Até">
                </li>
            </ul>
        </div>
        <div class="filter_dropdown" id="preco_range" style="display: none;">
            <input type="number" name="preco_min" id="preco_min" placeholder="Preço mínimo">
            <input type="number" name="preco_max" id="preco_max" placeholder="Preço máximo">
            <input type="number" name="preco_actual" id="preco_actual" placeholder="Preço atual">
        </div>

        <div class="filter_dropdown">
            <select name="sort" id="sort_filter">
                <!-- Options for sorting -->
                <option value="">Ordenar por</option>
                <option value="price_asc">Preço (menor para maior)</option>
                <option value="price_desc">Preço (maior para menor)</option>
                <!-- Add more options as needed -->
            </select>
        </div>
    </div>

</body>
</html>
