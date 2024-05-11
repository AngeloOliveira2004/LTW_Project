let selectedOption = 'users';

let allUsers = [];
let allItems = [];

let allUsersNames = [];
let allItemsNames = [];

let filteredUsers = [];
let filteredItems = [];

let suggestedUsers = [];
let suggestedItems = [];

document.addEventListener("DOMContentLoaded", async function() {
    await loadInitialContent();
});


async function loadInitialContent() {

    let allItemsJSON = [];
    let allUsersJSON = [];

    try {
        const response = await fetch('js/get_all_items.php');
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        console.log('Data fetched successfully');
        
        allItemsJSON = await response.json(); 
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    try {
        const response = await fetch('js/get_all_users.php');
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        console.log('Data fetched successfully');
        
        allUsersJSON = await response.json(); 
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    console.log(allUsersJSON);
    console.log(allItemsJSON);

    allUsers = [...allUsersJSON];
    allItems = [...allItemsJSON];

    console.log(allUsers);
    console.log(allItems);

    for(let i = 0; i < allUsers.length; i++) {
        
        let allUserName = allUsers[i][1].replace(/_/g, ' ');
        allUsersNames.push(allUserName);
    }

    for(let i = 0; i < allItems.length; i++) {
        allItemsNames.push(allItems[i][1]);
    }
}

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

function cleanSearchItemsDiv() {
    const searchItemsDiv = document.querySelector('.search-items');
    searchItemsDiv.innerHTML = '';
}

function cleanSearchUsersDiv() {
    const searchUsersDiv = document.querySelector('.search-users');
    searchUsersDiv.innerHTML = '';
}

function hideIcons() {
    const searchItemsDiv = document.querySelector('.options-icons');
    const items = searchItemsDiv.querySelectorAll('i');
    items.forEach(item => {
        item.style.display = 'none';
    });
}

function showIcons() {
    const searchItemsDiv = document.querySelector('.options-icons');
    const items = searchItemsDiv.querySelectorAll('i');
    items.forEach(item => {
        item.style.display = 'block';
    });
}

document.addEventListener("DOMContentLoaded", function() {
    
    showContent('usersContent');

    document.getElementById('users').addEventListener('click', function() {
        showContent('usersContent');
        selectedOption = 'users';
        cleanSearchItemsDiv();
        cleanSearchUsersDiv();
        showIcons();
        reaload();
    });

    document.getElementById('items').addEventListener('click', function() {
        showContent('itemsContent');
        selectedOption = 'items';
        console.log('Selected option: ' + selectedOption);
        cleanSearchItemsDiv();
        cleanSearchUsersDiv();
        showIcons();
        reaload();
    });

    document.getElementById('categories').addEventListener('click', function() {
        showContent('categoriesContent');
        selectedOption = 'categories';
        hideIcons();
        cleanSearchItemsDiv();
        cleanSearchUsersDiv();
        reaload();
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


function searchUsers(inputVal, users) {
    if (inputVal.length === 0) {
        return users; 
    } else {
        inputVal = inputVal.toLowerCase();
        
        
        return users.filter(function(user) {
            return user.name.toLowerCase().startsWith(inputVal);
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    reaload();
});


function reaload(){
    showContent('usersContent');
    var optionButtons = document.querySelectorAll('.option button');

    optionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            showContent('usersContent');
            selectedOption = 'users';
        });
    });

    const inputBox = document.querySelector('.search_bar');
    suggestedUsers[0] = inputBox.value;
    const resultBoxUsers = document.getElementById('result-box-users');
    const resultBoxItems = document.getElementById('result-box-items');
    const searchButton = document.querySelector('.search_button');

    inputBox.addEventListener('keyup', function() {
        const input = inputBox.value.trim(); // Trim to remove leading and trailing spaces
        let result;
        
        console.log("Key was pressed");

        console.log("allUsersName: " + allUsersNames);
        console.log("allItemsName: " + allItemsNames);


        console.log("Selected option: " + selectedOption);

        switch (selectedOption) {
            case 'users':

                if(input.length === 0) {
                    suggestedUsers = allUsersNames;
                    break;
                }else{
                    suggestedUsers = getSuggestions(input, allUsersNames); 
                }
                break;
            case 'items':

                if(input.length === 0) {
                    suggestedItems = allItemsNames;
                    
                    break;
                }else{
                    suggestedItems = getSuggestions(input, allItemsNames); 
                }
                
                break;
            default:
                break;
        }

        if(selectedOption === 'users'){
            result = suggestedUsers;
            console.log("Result Names: " + result);
            display_result(result);
        }else{
            result = suggestedItems;
            console.log("Result Items: " + result);
            display_result(result);
        }       
        
        console.log("Suggested: " + suggestedItems);
    });

    inputBox.addEventListener('click', function(event) {
        event.stopPropagation();
        if (selectedOption === 'users') {
            resultBoxUsers.style.display = 'block';
        } else {
            resultBoxItems.style.display = 'block';
        }
    });
    

    document.addEventListener('click', function(event) {
        const clickedElement = event.target;
        if (!inputBox.contains(clickedElement)) {
            
            if (selectedOption === 'users') {
                resultBoxUsers.style.display = 'none';
            }else{
                resultBoxItems.style.display = 'none';
            }
        }
    });

    searchButton.addEventListener('click', async function() {
        
        console.log("Search button clicked");

        console.log('Selected option: ' + selectedOption);

        switch (selectedOption) {
            case 'users':
                console.log("Searching users");
                console.log(suggestedUsers);
                filteredUsers = searchUsers(suggestedUsers); 
                render_users();
                break;
            case 'items':
                console.log("Searching items");
                console.log("SuggestedItems: " + suggestedItems)
                filteredItems = searchItems(suggestedItems); 
                render_items();
                break;
            default:
                break;
        }        
    });

}

function searchUsers(suggestedWords){
    let searchResults = [];
    for(let i = 0 ; i < allUsers.length; i++){
        for(let j = 0; j < suggestedWords.length; j++){
            let userName = allUsers[i][1].replace(/_/g, ' ');
            if(userName.startsWith(suggestedWords[j])){
                searchResults.push(allUsers[i]);
            }
        }   
    }
    return searchResults;
}

function searchItems(suggestedWords){
    let searchResults = [];
    for(let i = 0 ; i < allItems.length; i++){
        for(let j = 0; j < suggestedWords.length; j++){
            if(allItems[i][1].startsWith(suggestedWords[j])){
                searchResults.push(allItems[i]);
            }
        }   
    }

    console.log("SearchedItems" + searchResults);

    return searchResults;
}


function getItemsBySuggestion(suggestedWords){
    let searchResults = [];
    for(let i = 0 ; i < allItems.length; i++){
        for(let j = 0; j < suggestedWords.length; j++){
            if(allItems[i][1].startsWith(suggestedWords[j])){
                searchResults.push(allItems[i]);
            }
        }   
    }

    return searchResults;

}

function getSuggestions(input, allNames) {
   
    return allNames.filter(function(name) {
        return name.toLowerCase().startsWith(input.toLowerCase());
    });
}

// Function to display search results
function display_result(results) {
    console.log("displaying results");

    // Update the following lines to use IDs instead of class names
    let id = selectedOption === 'users' ? 'result-box-users' : 'result-box-items';
    console.log("ID: " + id);
    const resultBox = document.getElementById(id);

    console.log(resultBox);
    console.log(results); 

    resultBox.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultBox.innerHTML = '<li>No results found</li>';
        return;
    }

    const content = results.map(item => {
        return "<li onclick='selectInput(this)' class='searched_item'>" + item + "</li>";
    });

    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(element){
    document.querySelector('.search_bar').value = element.innerHTML;
}   

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



function render_items() {
    const searchItemsDiv = document.querySelector('.search-items');
    searchItemsDiv.innerHTML = '';

    console.log("Rendering items");
    console.log(filteredItems);
    // Render found items
    filteredItems.forEach(item => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('searched-item-container');

        // Fetch the item photo
        const itemId = item[0]; // Assuming item id is in the first index
        const itemPhotoUrl = `../assets/items/${itemId}-1.png`; // Construct the URL
        const itemPhoto = document.createElement('img');
        itemPhoto.src = itemPhotoUrl;
        itemPhoto.classList.add('item-photo');
        itemContainer.appendChild(itemPhoto);

        // Item title
        const titleElement = document.createElement('h3');
        titleElement.textContent = item[1]; // Assuming item name is in the second index
        titleElement.classList.add('item-title');
        itemContainer.appendChild(titleElement);

        // Item description
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = item[2]; // Assuming item description is in the third index
        descriptionElement.classList.add('item-description');
        itemContainer.appendChild(descriptionElement);

        // Item price
        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: ${item[6]}`; // Assuming price is in the sixth index
        priceElement.classList.add('item-price');
        itemContainer.appendChild(priceElement);

        // Heart icon (for wishlist)
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fas', 'fa-heart', 'heart-icon');
        heartIcon.addEventListener('click', function() {
            heartIcon.classList.toggle('heart-active');
        });
        itemContainer.appendChild(heartIcon);

        // Text for wishlist
        const addToWishlistText = document.createElement('p');
        addToWishlistText.textContent = "Add to Wishlist?";
        addToWishlistText.classList.add('text-icon');
        itemContainer.appendChild(addToWishlistText);

        searchItemsDiv.appendChild(itemContainer);
    });
}

function render_users(){

    console.log("Rendering users");
    console.log(filteredUsers);

    const searchUsersDiv = document.querySelector('.search-users');
    searchUsersDiv.innerHTML = '';

    // Render found users
    filteredUsers.forEach(user => {
        const userContainer = document.createElement('div');
        userContainer.classList.add('searched-user-container');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'A';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            // Toggle background color of the button
            if (deleteButton.classList.contains('selected')) {
                deleteButton.classList.remove('selected');
                deleteButton.style.backgroundColor = 'transparent';
            } else {
                deleteButton.classList.add('selected');
                deleteButton.style.backgroundColor = '#0B6E4F';
            }
        
            // Toggle background color of the user container
            if (userContainer.classList.contains('selected')) {
                userContainer.classList.remove('selected');
            } else {
                userContainer.classList.add('selected');
            }
        });
        userContainer.appendChild(deleteButton);
        // Fetch the user photo
        const userId = user[0]; // Assuming user id is in the first index
        const userPhotoUrl = `../assets/users/${userId}.png`; // Construct the URL
        const userPhoto = document.createElement('img');
        userPhoto.src = userPhotoUrl;
        userPhoto.classList.add('user-photo');
        userContainer.appendChild(userPhoto);

        // User name
        const nameElement = document.createElement('h2');
        nameElement.textContent = user[1]; // Assuming user name is in the second index
        nameElement.classList.add('user-name');
        userContainer.appendChild(nameElement);


        // User email
        const emailElement = document.createElement('p');
        emailElement.textContent = user[2]; // Assuming user email is in the third index
        emailElement.classList.add('user-email');
        userContainer.appendChild(emailElement);



        searchUsersDiv.appendChild(userContainer);
    });
}
