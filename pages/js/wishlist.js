document.addEventListener('DOMContentLoaded', function () {
    let removeWishlist = document.querySelectorAll('.fa-heart');

    removeWishlist.forEach(function (icon) {
        icon.addEventListener('click', function () {
        const itemId = icon.getAttribute('data-item-id');

        
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '../../db_handler/action_remove_wishlist.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

       


            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const itemElement = icon.closest('.item');
                    itemElement.remove();
                 
                }else {
                    console.error('Erro ao remover item da wishlist');
                }
            };

            xhr.send('itemId=' + encodeURIComponent(itemId));

        });
    });
});
