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


function addtocart(cartItems) {
    let carticon = document.querySelectorAll('.fa-cart-shopping');

    carticon.forEach(function (cart) {
        cart.addEventListener('click', function () {
            let itemsId = cart.getAttribute('data-item-id');
            let isInCart = cartItems.includes(parseInt(itemsId));

            const xhr = new XMLHttpRequest();

            xhr.open('POST', isInCart ? '../../db_handler/action_remove_cart.php' : '../../db_handler/action_shoppingcart.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log(xhr.responseText);
                    let response = JSON.parse(xhr.responseText);
                    console.log(response);
                    let updatedCartItems = response.shoppingcartitems;

                    if (updatedCartItems.includes(parseInt(itemsId))) {
                        cart.classList.remove('fa-cart-shopping');
                        cart.classList.add('fa-check');
                        if (!cartItems.includes(parseInt(itemsId))) {
                            cartItems.push(parseInt(itemsId));
                        }
                    } else {
                        cart.classList.add('fa-cart-shopping');
                        cart.classList.remove('fa-check');
                        cartItems = cartItems.filter(item => item !== parseInt(itemsId));
                    }
                    console.log(`Item ${itemsId} toggled`);
                }
            };
            xhr.send('itemId=' + encodeURIComponent(itemsId));
        });
    });
}

function fetchItemsAndUpdateHearts(cartItems) {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', '../../db_handler/action_get_all_cart_items.php', true);
    
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            let cartResult = JSON.parse(xhr.responseText);
            
            
            cartResult.forEach(function(item) {
                let itemElement = document.querySelector('.fa-cart-shopping[data-item-id="' + item + '"]');
                if (itemElement && !cartItems.includes(itemElement)) {
                    itemElement.classList.remove('fa-shopping-cart');
                    itemElement.classList.add('fa-check');
                    cartItems.push(parseInt(item));
                }
            });

            addtocart(cartItems);
        }
    };

    xhr.send();
}


document.addEventListener('DOMContentLoaded', function () {
    let cartItems = [];
    fetchItemsAndUpdateHearts(cartItems)
});


