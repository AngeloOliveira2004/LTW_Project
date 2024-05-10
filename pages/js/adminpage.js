let selectedOption = 'users';

function showContent(contentId) {
    // Oculta todos os conteúdos
    var contents = document.getElementsByClassName("content");
    for (var i = 0; i < contents.length; i++) {
        contents[i].style.display = "none";
    }
    // Mostra apenas o conteúdo selecionado
    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    
    showContent('usersContent');

    document.getElementById('users').addEventListener('click', function() {
        showContent('usersContent');
        selectedOption = 'users';
    });

    document.getElementById('items').addEventListener('click', function() {
        showContent('itemsContent');
        selectedOption = 'items';
    
    });

    document.getElementById('categories').addEventListener('click', function() {
        showContent('categoriesContent');
        selectedOption = 'categories';
    });
});


document.addEventListener("DOMContentLoaded", function() {
    var optionButtons = document.querySelectorAll('.option button');

    optionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            button.style.backgroundColor = '#A4969B';
            button.style.color = 'white';
            setTimeout(function() {
                button.style.backgroundColor = ''; 
                button.style.color = ''; 
            }, 30); 
        });
    });
});



// Function to search for users by their names
function searchUsers(inputVal, users) {
    if (inputVal.length === 0) {
        return users; // Return all users if search input is empty
    } else {
        inputVal = inputVal.toLowerCase();
        
        
        return users.filter(function(user) {
            return user.name.toLowerCase().startsWith(inputVal);
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    showContent('usersContent');
    var optionButtons = document.querySelectorAll('.option button');

    optionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            showContent('usersContent');
            selectedOption = 'users';
        });
    });

    const inputBox = document.querySelector('.search_bar');
    const resultBox = document.querySelector('.result-box');
    const searchButton = document.querySelector('.search_button');

    inputBox.addEventListener('keyup', function() {
        const input = inputBox.value.trim(); // Trim to remove leading and trailing spaces
        let result;

        // Perform search based on the selected option
        switch (selectedOption) {
            case 'users':
                result = searchUsers(input, users); // Assuming users is an array containing user objects with 'name' property
                break;
            case 'items':
                result = calculateSuggestions(input, items); // Assuming you already have items array
                break;
            case 'categories':
                // Implement search for categories if needed
                break;
            default:
                break;
        }

        display_result(result);
    });

    inputBox.addEventListener('click', function(event) {
        event.stopPropagation();
        resultBox.style.display = 'block';
    });

    document.addEventListener('click', function(event) {
        const clickedElement = event.target;
        if (!inputBox.contains(clickedElement)) {
            resultBox.style.display = 'none'; // Hide suggestion box
        }
    });

    searchButton.addEventListener('click', async function() {
        // Implement search functionality when the search button is clicked if needed
    });

    // Rest of your code...
});


// Function to display search results
function display_result(results) {
    const resultBox = document.querySelector('.result-box ul');
    resultBox.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultBox.innerHTML = '<li>No results found</li>';
        return;
    }

    results.forEach(result => {
        const listItem = document.createElement('li');
        listItem.textContent = result.name; // Assuming result is an object with 'name' property
        resultBox.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    showContent('usersContent');
    var optionButtons = document.querySelectorAll('.option button');

    optionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            showContent('usersContent');
            selectedOption = 'users';
        });
    });

    const inputBox = document.querySelector('.search_bar');
    const resultBox = document.querySelector('.result-box');
    const searchButton = document.querySelector('.search_button');

    inputBox.addEventListener('keyup', function() {
        const input = inputBox.value.trim(); // Trim to remove leading and trailing spaces
        let result;

        // Perform search based on the selected option
        switch (selectedOption) {
            case 'users':
                result = searchUsers(input, users); // Assuming users is an array containing user objects with 'name' property
                break;
            case 'items':
                result = calculateSuggestions(input, items); // Assuming you already have items array
                break;
            case 'categories':
                // Implement search for categories if needed
                break;
            default:
                break;
        }

        display_result(result);
    });

    inputBox.addEventListener('click', function(event) {
        event.stopPropagation();
        resultBox.style.display = 'block';
    });

    document.addEventListener('click', function(event) {
        const clickedElement = event.target;
        if (!inputBox.contains(clickedElement)) {
            resultBox.style.display = 'none'; // Hide suggestion box
        }
    });

    searchButton.addEventListener('click', async function() {
        // Implement search functionality when the search button is clicked if needed
    });

});


document.addEventListener("DOMContentLoaded", function() {
    var optionButtons = document.querySelectorAll('.option button');

    optionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            button.style.backgroundColor = '#A4969B';
            button.style.color = 'white';
            setTimeout(function() {
                button.style.backgroundColor = ''; 
                button.style.color = ''; 
            }, 30); 
        });
    });

    // Adding click event listeners to the buttons in the categoriesContent section
    const categoriesButtons = document.querySelectorAll('.CategoriesSections button');

    categoriesButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            button.style.backgroundColor = '#A4969B';
            button.style.color = 'white';
            setTimeout(function() {
                button.style.backgroundColor = ''; 
                button.style.color = ''; 
            }, 100); 
            // Handle button click logic here
            const buttonClass = button.parentNode.className;
            switch (buttonClass) {
                case 'showAllCateogiries':
                    // Handle logic for showing all categories
                    break;
                case 'showAllSubCateogiries':
                    // Handle logic for showing all subcategories
                    break;
                case 'AddCategory':
                    // Handle logic for adding a category
                    break;
                case 'AddSubCategory':
                    // Handle logic for adding a subcategory
                    break;
                case 'DeleteCategory':
                    // Handle logic for deleting a category
                    break;
                case 'DeleteSubCategory':
                    // Handle logic for deleting a subcategory
                    break;
                default:
                    break;
            }
        });
    });
});
