function toggleHeartColor() {
    let heartIcons = document.querySelectorAll('.fa-heart');

    heartIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            let itemId = icon.getAttribute('data-item-id');
            
            if (icon.classList.contains('fa-regular')) {
                addToWishlist(itemId); // Adiciona o item à wishlist
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid'); 
            } else {
                removeFromWishlist(itemId); // Remove o item da wishlist
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        });
    });
}


function toggleHeartColor() {
    let heartIcons = document.querySelectorAll('.fa-heart');

    heartIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            let itemId = icon.getAttribute('data-item-id');
            
            if (icon.classList.contains('fa-regular')) {
                addToWishlist(itemId); // Adiciona o item à wishlist
            } else {
                removeFromWishlist(itemId); // Remove o item da wishlist
            }
        });
    });
}

function addToWishlist(itemId) {
    // Aqui você faz uma solicitação AJAX para adicionar o item à lista de desejos no banco de dados
    $.ajax({
        type: 'POST',
        url: 'wishlist.php',
        data: { action: 'add', itemId: itemId },
        success: function(response) {
            console.log(response);
            // Atualize a aparência do ícone do coração conforme necessário
            let icon = document.querySelector(`.fa-heart[data-item-id='${itemId}']`);
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        }
    });
}

function removeFromWishlist(itemId) {
    // Aqui você faz uma solicitação AJAX para remover o item da lista de desejos no banco de dados
    $.ajax({
        type: 'POST',
        url: 'wishlist.php',
        data: { action: 'remove', itemId: itemId },
        success: function(response) {
            console.log(response);
            // Atualize a aparência do ícone do coração conforme necessário
            let icon = document.querySelector(`.fa-heart[data-item-id='${itemId}']`);
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    toggleHeartColor();
});

