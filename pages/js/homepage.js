function toggleHeartColor() {
    let heartIcons = document.querySelectorAll('.fa-heart');

    heartIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid'); 
                let itemId = icon.getAttribute('data-item-id');
                addToWishlist(itemId); // Adiciona o item à wishlist
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                let itemId = icon.getAttribute('data-item-id');
                removeFromWishlist(itemId); // Remove o item da wishlist
            }
        });
    });
}

function addToWishlist(itemId) {
    let wishlist = getWishlist();
    wishlist.push(itemId);
    saveWishlist(wishlist);
    console.log('Item adicionado à wishlist com sucesso:', itemId);
}

function removeFromWishlist(itemId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(item => item !== itemId);
    saveWishlist(wishlist);
    console.log('Item removido à wishlist com sucesso:', itemId);
}

function getWishlist() {
    let wishlist = [];
    // Verifica se há uma lista de desejos armazenada em cookies
    if (document.cookie.includes('wishlist=')) {
        wishlist = document.cookie.split('; ').find(row => row.startsWith('wishlist=')).split('=')[1].split(',');
    }
    return wishlist;
}

function saveWishlist(wishlist) {
    document.cookie = `wishlist=${wishlist.join(',')}`;
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
