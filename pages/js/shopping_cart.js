document.addEventListener('DOMContentLoaded', function () {
    const removeButtons = document.querySelectorAll('.Remove_cart');

    removeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const itemId = button.getAttribute('data-item-id');
            
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '../../db_handler/action_remove_cart.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const itemElement = button.closest('.item');
                    itemElement.remove();
                    
                } else {
                    console.error('Erro ao remover item do carrinho');
                }
            };

            xhr.send('itemId=' + encodeURIComponent(itemId));
        });
    });
});