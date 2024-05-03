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
            <p>Primeiro, introduz um título*</p>
            <p class = "box_title">Tenta ser o mais descritivo e apelativo possível</p>
            <input type="text" class = "Item-Title">

            <p>Categoria</p>
            <ul class="Categories">
                <li value="">Selecione uma categoria</li>
                
            </ul>

            <p>Sub-Categoria</p>
            <ul class="Sub-Categories">
                <li value="">Selecione uma sub-categoria</li>
                
            </ul>
        </section>

        <section class = "Item-Images">
            <p class = "images">Imagens</p>
            <p class = "images_text">A primeira imagem é a foto principal do teu anúncio. Podes inserir outras 15</p>
            <?php for ($i = 1; $i <= 15; $i++): ?>
                <input class ="image_inputer" type="file" id="image<?= $i ?>" name="image<?= $i ?>" accept="image/*">
                <label class = "image_icon" for="image<?= $i ?>"><img src="../assets/camera.png" alt="Camera Icon"></label><br>
            <?php endfor; ?>
        </section>

        <section class = "Item-Description">
            <p>Introduza uma boa descrição do item!*</p>
            <input type="text" class ="Item-Description">
            <p>Introduza no mínimo 10 caracteres e no máximo 1000</p>
        </section>

        <section class = "Item-Price-Trade">
            <p class = "Preço">Preço:</p>
            <input type="text" class ="Preço">
            <button class ="Negociável">Negociável</button>
        </section>

        <section class = "Additional-Info">
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
            <button class ="Publicar">Publicar anúncio</button>
        </section>
        </div>
        <?php
            include 'templates/footer.php';
        ?>

</body>
</html>
