<?php

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<body>
    <header>
        
    <img src="assets/logo.png" alt="" width="100" height="50">

    <img src="assets/search.png" alt="" width="40" height="30">


    <img src="assets/heart.png" alt="" width="40" height="30">

    <img src="assets/shopping-cart.png" alt="" width="40" height="30">

    <img src="assets/user.png" alt="" width="40" height="30">
    <button>Annouce Now!</button>
    
    </header>
    <div>
        <p>Compra e Venda de Produtos em 2ª Mão!</p>
        <p>Compre e venda produtos usados de forma segura e rápida</p>
        
        <nav>
            <form action="/search" method="get">
                <input type="text" placeholder="What are you looking for?" name="search">
            </form>
        </nav>

        <nav>
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="produtos.php">Produtos</a></li>
                <li><a href="carrinho.php">Carrinho</a></li>
                <li><a href="login.php">Login</a></li>
                <li><a href="cadastro.php">Cadastro</a></li>
            </ul>
        </nav>
        <form action="resultado_da_pesquisa" method= "GET">
            <input type="text" name="pesquisa" placeholder="pesquisar">
            <button type="submit">search</button>
        </form>
    </div>
</body>
</html>
