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

function fetchItemsAndUpdateHearts(wishlistItems) {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', '../../db_handler/action_get_all_wishlisted_items.php', true);
    
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            wishlistItems = JSON.parse(xhr.responseText);
            
            wishlistItems.forEach(function(item) {
                let itemElement = document.querySelector('.fa-heart[data-item-id="' + item + '"]');
                if (itemElement) {
                    itemElement.classList.remove('fa-regular');
                    itemElement.classList.add('fa-solid');
                }
            });
        }
    };

    xhr.send();
}


document.addEventListener('DOMContentLoaded', function () {
    let wishlistItems = [];
    fetchItemsAndUpdateHearts(wishlistItems);
    toggleHeartColor(wishlistItems);

    // Select the search button element
    let searchButton = document.querySelector('.search_button');

    // Add click event listener to the search button
    searchButton.addEventListener('click', function () {
        // Retrieve the values of the search bar and dropdown menu
        let searchBarValue = document.querySelector('.search_bar').value;
        let categoryDropdownValue = document.querySelector('.category_dropdown').value;

        // Construct the search page URL with search parameters
        let searchPageURL = 'search_page.php?search=' + encodeURIComponent(searchBarValue) + '&location=' + encodeURIComponent(categoryDropdownValue);

        // Redirect to the search page with search parameters
        window.location.href = searchPageURL;
    });

    let brandButtons = document.querySelectorAll('.brands button');

    // Add click event listener to each brand button
    brandButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let brandName = button.textContent.trim();
            let searchPageURL = 'search_page.php?brand=' + encodeURIComponent(brandName);
            window.location.href = searchPageURL;
        });
    });

    let categoryContainers = document.querySelectorAll('.Categories .image-container');

    categoryContainers.forEach(function(container) {
        container.addEventListener('click', function() {
            let categoryValue = container.querySelector('span').textContent.trim();
            let searchPageURL = 'search_page.php?category=' + encodeURIComponent(categoryValue);
            window.location.href = searchPageURL;
        });
    });
});



