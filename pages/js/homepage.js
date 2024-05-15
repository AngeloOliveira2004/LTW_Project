function toggleHeartColor(wishlistItems) {
    let heartIcons = document.querySelectorAll('.fa-heart');

    heartIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            let itemId = icon.getAttribute('data-item-id');
            console.log(itemId);
            let isInWishlist = wishlistItems.includes(parseInt(itemId)); 
            console.log(wishlistItems);
            console.log(isInWishlist);
            const xhr = new XMLHttpRequest();

            xhr.open('POST', isInWishlist ? '../../db_handler/action_remove_wishlist.php' : '../../db_handler/action_add_wishlist.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log(xhr.responseText);

                    let wishlistItemsResult = JSON.parse(xhr.responseText).wishlistItems;

                    if (wishlistItemsResult.includes(itemId)) {
                        icon.classList.remove('fa-regular');
                        icon.classList.add('fa-solid');
                        wishlistItems.push(parseInt(itemId));
                    } else {
                        icon.classList.remove('fa-solid');
                        icon.classList.add('fa-regular');
                        wishlistItems = wishlistItems.filter(item => parseInt(item) !== parseInt(itemId));
                    }

                    console.log(`Item ${itemId} toggled`);
                }
            };

            xhr.send('itemId=' + encodeURIComponent(itemId));
        });
    });
}

function fetchItemsAndUpdateHearts(wishlistItems) {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', '../../db_handler/action_get_all_wishlisted_items.php', true);
    
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            let wishlistItemsResult = JSON.parse(xhr.responseText);
            
            
            wishlistItemsResult.forEach(function(item) {
                let itemElement = document.querySelector('.fa-heart[data-item-id="' + item + '"]');
                if (itemElement && !wishlistItems.includes(itemElement)) {
                    itemElement.classList.remove('fa-regular');
                    itemElement.classList.add('fa-solid');
                    wishlistItems.push(parseInt(item));
                }
            });

            toggleHeartColor(wishlistItems);
        }
    };

    xhr.send();
}


document.addEventListener('DOMContentLoaded', function () {
    let wishlistItems = [];
    fetchItemsAndUpdateHearts(wishlistItems);

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



