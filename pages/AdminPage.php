<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AdminPage</title>

    <link href="../css/adminPage.css" rel="stylesheet">
    <link rel="shortcut icon" href="#">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="js/adminpage.js"></script>
</head>
<body>
    <?php
        include 'templates/header.php';
    ?>


    <div class="adminPage">
        <h1>Página de Administrador</h1>

        <h3>Selecione a opção que deseja visualizar</h3>

        <div class="adminOptions">
            <div class="option" id="users">
                <button>
                    <i class="fa fa-users"></i>
                    <p>Utilizadores</p>
                </button>
            </div>

            <div class="option" id="items">
                <button>
                <i class="fa fa-shopping-cart"></i>
                <p>Itens</p>
                </button>
            </div>

            <div class="option" id="categories">
                <button>
                <i class="fa fa-list
                "></i>
                <p>Categorias</p>
                </button>
            </div>     
        </div>


        <div id="usersContent" class="content">

            <div class="optionsText">
                <h4>Opção dos users: </h4>

                <i class="fa fa-question-circle"></i>
            </div>
            <section class="search_table">

                <?php
                require_once '../db_handler/DB.php';

                $db = new Database('../database/database.db');

                $users = $db->getAllUsers();
                ?>


                <span class="search_table">

                    <div class="search-box">
                        <div class="row">
                            <input type="text" placeholder="O que Procuras?" class="search_bar"> </input>
                        </div>

                        <div class="result-box" id = "result-box-users">
                            <ul class="result">

                            </ul>
                        </div>
                    </div>


                    <button class="search_button">
                        Pesquisar
                        <img src="assets/search-interface-symbol.png" alt="search-icon" class="search_icon">
                    </button>
                </span>
            </section>
        </div>

        <div id="itemsContent" class="content" style="display: none;">
            <div class="optionsText">
                <h4>Opção dos items</h4>
                <i class="fa fa-question-circle"></i>
            </div>

            <section class="search_table">

                <?php
                require_once '../db_handler/DB.php';

                $db = new Database('../database/database.db');

                $users = $db->getItems();
                ?>


                <span class="search_table">

                    <div class="search-box">
                        <div class="row">
                            <input type="text" placeholder="O que Procuras?" class="search_bar"> </input>
                        </div>

                        <div class="result-box" id = "result-box-items">
                            <ul class="result">

                            </ul>
                        </div>
                    </div>


                    <button class="search_button">
                        Pesquisar
                        <img src="assets/search-interface-symbol.png" alt="search-icon" class="search_icon">
                    </button>
                </span>
            </section>
        </div>

        <div id="categoriesContent" class="content" style="display: none;">
            <div class="optionsText">
                <h4>Opção das categorias</h4>
                 <i class="fa fa-question-circle"></i>
            </div>
            <div class = "CategoriesSections">
            <section class = "showAllCateogiries">
                <button>
                    <h4>Show all Categories</h4>
                    <i class="fa fa-list"></i>
                    
                </button>
            </section>

            <section class = "showAllSubCateogiries">
                <button>
                    <h4>Show all Sub Categories</h4>
                    <i class="fa fa-list"></i>
                </button>
            </section>

            <section class = "AddCategory">
                <button>
                    <h4>Add Category</h4>
                    <i class="fa fa-plus" ></i>
                </button>
            </section>

            <section class = "AddSubCategory">
                <button>
                    <h4>Add Sub Category</h4>
                    <i class="fa fa-plus" ></i>
                </button>
            </section>

            <section class = "DeleteCategory">
                <button>
                    <h4>Delete Category</h4>
                    <i class="fa fa-trash" ></i>
                </button>
            </section>

            <section class = "DeleteSubCategory">
                <button>
                    <h4>Delete Sub Category</h4>
                    <i class="fa fa-trash" ></i>
                </button>
            </section>
            </div>
        </div>

    <div class = "options-icons">
        <i class="fas fa-trash trash-icon" ></i>
        <i class="fas fa-arrow-up up-arrow-icon" ></i>
        <i class="fas fa-arrow-down down-arrow-icon"></i>
    </div>

    <div class = "search-items"></div>

    <div class = "search-users"></div>


    <?php
        include 'templates/footer.php';
    ?>

</body>
</html>