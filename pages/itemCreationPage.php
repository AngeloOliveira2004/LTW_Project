<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ItemCreationPage</title>
</head>

<body>
        <?php
            include 'templates/header.php';
        ?>

        <p>Publicar Anúncio</p>

        <section class = "Item-Title-And-Categories">
            <p>Introduza um ótimo título!*</p>
            
            <input type="text" class = "Item-Title">

            <p>Categoria</p>

            <ul class = "Categories">

            </ul>

            <p>Sub-Categoria</p>

            <ul class = "Sub-Categories">

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
            <button class = "Troca">Troca</button>
            <button class = "Ambos">Ambos</button>

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

        <?php
            include 'templates/footer.php';
        ?>
</body>


</html>