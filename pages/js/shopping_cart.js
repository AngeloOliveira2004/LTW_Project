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
                    UpdatePrice();
                    
                } else {
                    console.error('Erro ao remover item do carrinho');
                }
            };

            xhr.send('itemId=' + encodeURIComponent(itemId));

        });
    });

    UpdatePrice();

    const shippingSelect = document.querySelector('.shipping select');
    const paymentSelect = document.querySelector('.payment-method select');

    shippingSelect.addEventListener('change', function () {
        UpdatePrice();
    });
    
    paymentSelect.addEventListener('change', function () {
        UpdatePrice();
    });

    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', function () {

        let shoppingItems = document.querySelectorAll('.item');

        let shoppingItemIds = [];

        shoppingItems.forEach(function(item) {
            let itemId = item.querySelector('.Remove_cart').getAttribute('data-item-id');
            shoppingItemIds.push(itemId);
        });

        const shippingMethod = document.querySelector('.shipping select').value;

        const paymentMethod = document.querySelector('.payment-method select').value;

        const totalPrice = document.querySelector('.total-price-value').textContent.replace(/.$/,"");

        let json_itemIds = JSON.stringify(shoppingItemIds);

        let formData = new FormData();

        formData.append("paymentMethod",paymentMethod);
        formData.append("shippingMethod",shippingMethod);
        formData.append("totalPrice",totalPrice);
        formData.append("jsonItemIds",json_itemIds);
    
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../../db_handler/action_checkout.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('Checkout successful');
                window.location.href = '../pages/loader.php';
            } else {
                console.error('Error during checkout');
            }
        };

        xhr.send(formData);
    });
    
});

function UpdatePrice() {
    let itemPrices = document.querySelectorAll('.item p');
    let totalPrice = 0;
    UpdateItemCount();

    itemPrices.forEach(function(price) {
        let priceValue = parseFloat(price.textContent.replace('Price: ', '').replace('€', ''));
        totalPrice += priceValue;
    });

    let totalItemPriceElement = document.querySelector('.total-item-price-value');
    totalItemPriceElement.textContent = totalPrice.toFixed(2) + '€';

    const shippingMethod = document.querySelector('.shipping select').value;

    const paymentMethod = document.querySelector('.payment-method select').value;

    totalPrice += calculateShippingPrice(shippingMethod) * itemPrices.length;
    if(itemPrices.length != 0){
        totalPrice += calculatePaymentMethodPrice(paymentMethod);
    }

    let totalPriceElement = document.querySelector('.total-price-value');
    totalPriceElement.textContent = totalPrice.toFixed(2) + '€';
}

function UpdateItemCount(){
    let itemCount = document.querySelectorAll('.item').length;
    let itemCountElement = document.querySelector('.item-count-value');
    itemCountElement.textContent = itemCount;
}


function calculateShippingPrice(method) {
    switch(method) {
        case 'standard':
            return 5.00;
        case 'express':
            return 10.00;
        case 'next-day':
            return 15.00;
        case 'international':
            return 20.00;
        default:
            return 0;
    }
}

function calculatePaymentMethodPrice(method) {
    switch(method) {
        case 'credit-card':
            return 0.50;
        case 'paypal':
            return 0.75;
        case 'apple-pay':
            return 0.60;
        case 'mb-way':
            return 0.40;
        default:
            return 0;
    }
}