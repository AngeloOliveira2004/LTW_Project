function toggleHeartColor(wishlistItems) {
    let heartIcons = document.querySelectorAll('.fa-heart');

    heartIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            let itemId = icon.getAttribute('data-item-id');
            let isInWishlist = wishlistItems.includes(itemId);

            const xhr = new XMLHttpRequest();

            xhr.open('POST', isInWishlist ? '../../db_handler/action_remove_wishlist.php' : '../../db_handler/action_add_wishlist.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log(xhr.responseText);

                    wishlistItems = JSON.parse(xhr.responseText).wishlistItems;

                    if (wishlistItems.includes(itemId)) {
                        icon.classList.remove('fa-regular');
                        icon.classList.add('fa-solid');
                    } else {
                        icon.classList.remove('fa-solid');
                        icon.classList.add('fa-regular');
                    }

                    console.log(`Item ${itemId} toggled`);
                }
            };

            xhr.send('itemId=' + encodeURIComponent(itemId));
        });
    });
}


document.addEventListener('DOMContentLoaded', function () {
    let wishlistItems = [];
    toggleHeartColor(wishlistItems);

    // Select the search button element
    var searchButton = document.querySelector('.search_button');

    // Add click event listener to the search button
    searchButton.addEventListener('click', function() {
        console.log('search button clicked');
        
        // Retrieve the values of the search bar and dropdown menu
        var searchBarValue = document.querySelector('.search_bar').value;
        var categoryDropdownValue = document.querySelector('.category_dropdown').value;
        
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



