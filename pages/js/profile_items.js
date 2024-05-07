document.addEventListener('DOMContentLoaded', function() {
    const ratings = document.getElementById("ratings-link");
    ratings.addEventListener("click", hideItems);

    function hideItems(event) {
        const items = document.getElementById("items-section");
        const item_count = document.getElementById("item-count");
        items.style.display = 'none';
        item_count.style.display = 'none';

        const reviews = document.getElementById("reviews-section");
        const reviews_count = document.getElementById("reviews-count");
        reviews.style.display = 'flex';
        reviews_count.style.display = 'flex';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const ratings = document.getElementById("listings-link");
    ratings.addEventListener("click", hideItems);

    function hideItems(event) {
        const items = document.getElementById("items-section");
        const item_count = document.getElementById("item-count");
        items.style.display = 'flex';
        item_count.style.display = 'flex';

        const reviews = document.getElementById("reviews-section");
        const reviews_count = document.getElementById("reviews-count");
        reviews.style.display = 'none';
        reviews_count.style.display = 'none';
    }
});


document.addEventListener("DOMContentLoaded", function() {
    let editProfileButton = document.getElementById("edit_profile");

    editProfileButton.addEventListener("click", function() {
        window.location.href = "editprofile.php";
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('log_out').addEventListener('click', function() {
        window.location.href = '../../db_handler/action_logout.php';
    });
});