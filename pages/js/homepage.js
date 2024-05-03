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

    $('.search_button').click(function() {

        console.log('search button clicked');
        // Retrieve the values of the search bar and dropdown menu
        var searchBarValue = $('.search_bar').val();
        var categoryDropdownValue = $('.category_dropdown').val();
    
        console.log(categoryDropdownValue);
        
        if(categoryDropdownValue === 'Todas as Categorias' || categoryDropdownValue === "") {
            categoryDropdownValue = 'All';
        }
        // Log the values
        console.log('Search bar value: ' + searchBarValue);
        console.log('Category dropdown value: ' + categoryDropdownValue);

        var searchPageURL = 'search_page.php?search=' + encodeURIComponent(searchBarValue) + '&category=' + encodeURIComponent(categoryDropdownValue);

        // Redirect to the search page
        window.location.href = searchPageURL;
    });
});

