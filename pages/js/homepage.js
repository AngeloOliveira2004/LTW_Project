function toggleHeartColor() {
    let heartIcons = document.querySelectorAll('.fa-heart');

    heartIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid'); 
                let itemId = icon.getAttribute('data-item-id');
                window.location.href = 'wishlist.php?item=' + itemId;
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    toggleHeartColor();
});