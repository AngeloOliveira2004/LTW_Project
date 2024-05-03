<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ItemCreationPage</title>

    <link href="../../css/itemCreation.css" rel="stylesheet">
    
</head>

<body>
        <?php
            include 'templates/header.php';
        ?>

        <p class = "publish">Publicar Anúncio</p>
        <div class = "ItemCreation">

        <section class = "Item-Title-And-Categories">
            <p>Primeiro , introduz um título*</p>

            <p class = "box_title">Tenta ser o mais descritivo e apelativo pssível</p>
            <div class = >

            </div>
            <input type="text" class = "Item-Title">

            <p>Categoria</p>

            <ul class = "Categories">
                <li>
                    <input type="text">
                </li>
            </ul>

            <p>Sub-Categoria</p>

            <ul class = "Sub-Categories">
                <li>
                    <input type="text">
                </li>
            </ul>
        </section>

        <section class = "Item-Images">
            <p>Imagens</p>
            <p>A primeira imagem é a foto principal do teu anúncio. Podes inserir outras 15</p>


        </section>

        <section class = "Item-Description">

        <p>Introduza um boa descroção do item!*</p>

        <input type="text" class ="Item-Description">

        <p>Introduza no mínimo 10 caracteres e no máximo 1000</p>

        </section>

        <section class = "Item-Price-Trade">
            <button class = "Preço">Preço</button>

            <input type="text" class ="Preço">

            <button class ="Negociável">Negociável</button>
            
        </section>

        <section class = "Aditional-Info">

            <p>Tamanho</p>

            <ul class = "sizes"></ul>

            <p>Marca*</p>


            <input type="text" class="Marca">

            <p>Modelo</p>

            <input type="text" class="Modelo">

            <p>Estado*</p>

            <input type="text" class="Estado">

        </section>

        <section>
            <p>Pré Visualizar</p>

            <button class ="Publicar"> Publicar anúncio</button>
        </section>
        </div>
        <?php
            include 'templates/footer.php';
        ?>

</body>


</html>