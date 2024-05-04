let phone_number_value_save = "";
let email_value_save = "";
let isContentHiddenEmail = true;
let isContentHiddenPassword = true;

document.addEventListener("DOMContentLoaded", function() {
    // Get all heart icons
    const heartIcons = document.querySelectorAll('.fa-heart');

    // Loop through each heart icon
    heartIcons.forEach(function(icon) {
        // Add click event listener
        icon.addEventListener('click', function() {
            toggleHeart(icon);
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.getElementById("prev-image");
    const nextButton = document.getElementById("next-image");
    let currentImageIndex = 1; 

    const itemImage = document.getElementById("item_image");

    id_plus_numberOfphotos = itemImage.className;

    const itemId = itemImage.className.split("-")[0];
    const numberOfPhotos = id_plus_numberOfphotos.split("-")[1];

    console.log(itemId);
    console.log(numberOfPhotos);    
    
    const messageButton = document.getElementById('message_button');
    // Function to toggle heart icon
    function toggleHeart(icon) {
        icon.classList.toggle("fa-heart");
        icon.classList.toggle("fa-heart-filled");
    }

    messageButton.addEventListener('click', function() {
        this.classList.add('clicked');
        
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 100); 
    });

    for (let i = 1; i <= numberOfPhotos; i++) {
        const previewImages = document.getElementsByClassName(`prev-image${i}`);
        console.log(previewImages);
        Array.from(previewImages).forEach(function(previewImage) {
            previewImage.addEventListener('click', function() {
                const imageId = parseInt(this.classList[0].replace("prev-image", ""));
                currentImageIndex = imageId;
                updateImage();
            });
        });
    }

    prevButton.addEventListener("click", function() {
        if (currentImageIndex > 1) {
            currentImageIndex--;
            updateImage();
        }else if(currentImageIndex-1 == 0){
            currentImageIndex = numberOfPhotos;
            updateImage();
        }
    });

    
    nextButton.addEventListener("click", function() {
        if (currentImageIndex < numberOfPhotos) { 
            currentImageIndex++;
            updateImage();
        }else if(currentImageIndex == numberOfPhotos){
            currentImageIndex = 1;
            updateImage();
        }
    });

    
    function updateImage() {
        const itemImage = document.getElementById("item_image");
        itemImage.src = `../assets/items/${itemId}-${currentImageIndex}.png`;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    var phone_number_value = document.getElementById('user_phonenumber');
    var email_value = document.getElementById('user_email');

    phone_number_value_save = phone_number_value.textContent;
    email_value_save = email_value.textContent;
    phone_number_value.textContent = "*".repeat(phone_number_value_save.length);
    email_value.textContent = "*".repeat(email_value_save.length);
});

document.addEventListener('DOMContentLoaded', function() {
    const reveal_button = document.getElementById("reveal-num-button");
    reveal_button.addEventListener("click", toggleContent);

    function toggleContent(event) {
        const phone_number = document.getElementById("user_phonenumber");
        if (isContentHiddenPassword) {
            phone_number.textContent = phone_number_value_save;
            reveal_button.textContent = "Hide Number";
        } else {
            phone_number.textContent = "*".repeat(phone_number_value_save.length);
            reveal_button.textContent = "Reveal Number";
        }
        isContentHiddenPassword = !isContentHiddenPassword;
    }
});

/*
const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");

    const itemsPerPage = 5;
    let currentPage = 1;

    function displayItems() {
        const items = document.querySelectorAll('.item');
        items.forEach((item, index) => {
            if (index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displayItems();
        }
    });

    nextPageBtn.addEventListener('click', function() {
        const totalItems = document.querySelectorAll('.item').length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayItems();
        }
    });

    displayItems();
    */