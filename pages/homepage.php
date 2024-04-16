
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<body>
    <?php
        include 'templates/header.php';
    ?>

    <table class="search_table">
        <tr>
            <td class="search_bar">
                <input type="text" placeholder="O que Procuras?">
            </td>
            <td class="category_bar">
                <input type="text" placeholder="Todas as Categorias">
            </td>
            <td>
                <button class="search_button">
                    Pesquisar
                </button>
            </td>
        </tr>
    </table>
    
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
    
    <div class = "Feed de Noticias">
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
