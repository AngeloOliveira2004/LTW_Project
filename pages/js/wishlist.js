function toggleHeartColor(wishlistItems) {
    let heartIcons = document.querySelectorAll('.fa-heart');

    heartIcons.forEach(function (icon) {
        let itemId = icon.getAttribute('data-item-id');
        let isInWishlist = wishlistItems.includes(itemId);

        if (isInWishlist) {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
        }
        const xhr = new XMLHttpRequest();
        icon.addEventListener('click', function () {
            const xhr = new XMLHttpRequest();

            xhr.open('POST', '../../db_handler/action_remove_wishlist.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let responseData = JSON.parse(xhr.responseText);
                    wishlistItems = responseData.wishlistItems || []; // Garante que wishlistItems seja um array
                    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

                    icon.classList.remove('fa-solid');
                    icon.classList.add('fa-regular');
                }
            };

            xhr.send('itemId=' + encodeURIComponent(itemId));

            // Remova o item da lista de desejos localmente
            wishlistItems = Array.isArray(wishlistItems) ? wishlistItems.filter(item => item !== itemId) : [];
        });
    });

    return wishlistItems;
}

document.addEventListener('DOMContentLoaded', function () {
    let storedWishlistItems = localStorage.getItem('wishlistItems');
    let wishlistItems = storedWishlistItems ? JSON.parse(storedWishlistItems) : [];
    toggleHeartColor(wishlistItems);
});