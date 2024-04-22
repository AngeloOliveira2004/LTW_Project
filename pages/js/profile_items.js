document.addEventListener('DOMContentLoaded', function() {
    const ratings = document.getElementById("ratings-link");
    ratings.addEventListener("click", hideItems);

    function hideItems(event) {
        const items = document.getElementById("items-section");
        const item_count = document.getElementById("item-count");
        items.style.display = 'none';
        item_count.style.display = 'none';
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
    }
});
