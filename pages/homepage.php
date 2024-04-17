
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
</head>
<body>
    <?php
        include 'templates/header.php';
    ?>

    <span class="search_table">
        <input type="text" placeholder="O que Procuras?" class="search_bar">
        <input type="text" placeholder="Todas as Categorias" class="category_search">
        <button class="search_button">
            Pesquisar
            <img src="assets/search-interface-symbol.png" alt="search-icon" class = "search_icon">
        </button>
    </span>
    
    <div class = "Categories">
        <span>
            Cateorias Principais
        </span>

        <table class="data_table">
            <tr>
                <td><a href="#">Column 1</a></td>
                <td><a href="#">Column 2</a></td>
                <td><a href="#">Column 3</a></td>
                <td><a href="#">Column 4</a></td>
                <td><a href="#">Column 5</a></td>
                <td><a href="#">Column 6</a></td>
                <td><a href="#">Column 7</a></td>
                <td><a href="#">Column 8</a></td>
                <td><a href="#">Column 9</a></td>
            </tr>
        </table>
    </div>
    
    <div class = "Destaques">
        <table class="news_feed_table">
            <?php
            for ($i = 0; $i < 5; $i++) {
                echo "<tr>";
                for ($j = 0; $j < 5; $j++) {
                    echo "<td>Row $i, Column $j</td>";
                }
                echo "</tr>";
            }
            ?>
        </table>
    </div>
    
</body>
</html>
