let selectedOption = 'users';

let allUsers = [];
let allItems = [];

let allUsersNames = [];
let allItemsNames = [];

let filteredUsers = [];
let filteredItems = [];

let suggestedUsers = [];
let suggestedItems = [];

let allCategories = [];
let allSubCategories = [];
let allSizes = [];
let allConditions = [];

let selectedUsersGlobal = [];

document.addEventListener("DOMContentLoaded", async function() {
    await loadInitialContent();
});


async function loadInitialContent() {

    let allItemsJSON = [];
    let allUsersJSON = [];
    let allCategoriesJSON = [];
    let allSubCategoriesJSON = [];
    let allSizesJSON = [];
    let allConditionsJSON = [];

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

    try {
        const response = await fetch('js/get_all_Categories.php');
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        console.log('Data fetched successfully');
        
        allCategoriesJSON = await response.json(); 
    }catch(error){
        console.error('Error fetching data:', error);
    }

    try {
        const response = await fetch('js/get_all_conditions.php');
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        console.log('Data fetched successfully');
        
        allConditionsJSON = await response.json(); 
    }catch(error){
        console.error('Error fetching data:', error);
    }

    try {
        const response = await fetch('js/get_all_sizes.php');
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        console.log('Data fetched successfully');
        
        allSizesJSON = await response.json(); 
    }catch(error){
        console.error('Error fetching data:', error);
    }

    try {
        const response = await fetch('js/get_all_subCategories.php');
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        console.log('Data fetched successfully');
        
        allSubCategoriesJSON = await response.json(); 
    }catch(error){
        console.error('Error fetching data:', error);
    }

    console.log(allUsersJSON);
    console.log(allItemsJSON);

    allUsers = [...allUsersJSON];
    allItems = [...allItemsJSON];
    allCategories = [...allCategoriesJSON];
    allConditions = [...allConditionsJSON];
    allSizes = [...allSizesJSON];
    allSubCategories = [...allSubCategoriesJSON];

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
        cleanMiscelaneousStuffDiv();
        showIcons();
        const arrowUpButton = document.getElementById("arrow_up");
        const arrowDownButton = document.getElementById("arrow_down");
        arrowDownButton.style.display = "block";
        arrowUpButton.style.display = "block";
    });

    document.getElementById('items').addEventListener('click', function() {
        
        showContent('itemsContent');
        selectedOption = 'items';
        console.log("Selected option: " + selectedOption);
        cleanSearchItemsDiv();
        cleanSearchUsersDiv();
        cleanMiscelaneousStuffDiv();
        showIcons();
        const arrowUpButton = document.getElementById("arrow_up");
        const arrowDownButton = document.getElementById("arrow_down");
        arrowDownButton.style.display = "block";
        arrowUpButton.style.display = "block";
        
    });

    document.getElementById('categories').addEventListener('click', function() {
        showContent('categoriesContent');
        selectedOption = 'categories';
        hideIcons();
        cleanSearchItemsDiv();
        cleanSearchUsersDiv();
        cleanMiscelaneousStuffDiv();
        showIcons();
        const arrowUpButton = document.getElementById("arrow_up");
        const arrowDownButton = document.getElementById("arrow_down");
        arrowDownButton.style.display = "none";
        arrowUpButton.style.display = "none";
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
    showContent('usersContent');
    console.log("Realoading1");

    var optionButtons = document.querySelectorAll('.option button');

    optionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            showContent('usersContent');
            selectedOption = 'users';
        });
    });

    console.log("Realoading2");

    const inputBox = document.querySelector('.search_bar');
    suggestedUsers[0] = inputBox.value;
    const resultBoxUsers = document.getElementById('result-box-users');
    const resultBoxItems = document.getElementById('result-box-items');
    const searchButton = document.querySelector('.search_button');

    console.log(inputBox);
    console.log(searchButton);

    console.log("allItemsName: " + allItemsNames);

    inputBox.addEventListener('keyup', function() {
        const input = inputBox.value.trim(); 
        let result;

        if(input.length === 0) {
            suggestedUsers = allUsersNames;
            
        }else{
            suggestedUsers = getSuggestions(input, allUsersNames); 
        }
          
        result = suggestedUsers;
        console.log("Result Names: " + result);
        display_result(result);
    });

    inputBox.addEventListener('click', function(event) {
        event.stopPropagation();
        resultBoxItems.style.display = 'block';
        resultBoxUsers.style.display = 'block';
    });
    

    document.addEventListener('click', function(event) {
        const clickedElement = event.target;
        if (!inputBox.contains(clickedElement)) {
            resultBoxUsers.style.display = 'none';
            resultBoxItems.style.display = 'none';
        }
    });

    searchButton.addEventListener('click', async function() {
        suggestedUsers = getSuggestions(inputBox.value.trim() , allUsersNames); 
        console.log(suggestedUsers);
        filteredUsers = searchUsers(suggestedUsers); 
        render_users();    
    });


    const inputBoxItem = document.getElementById("search-bar-item");

    console.log("input box" + inputBoxItem);

    inputBoxItem.addEventListener('keyup', function() {
        const input2 = inputBoxItem.value.trim(); 
        let result;
        
        console.log("Key was pressed here");
        console.log("input2: " + input2);

        console.log("allItemsName: " + allItemsNames);

        suggestedItems = getSuggestions(input2, allItemsNames); 
        
        result = suggestedItems;
        console.log("Result Items: " + result);
        display_result(result);
    
        console.log("Suggested: " + suggestedItems);
    });

    inputBoxItem.addEventListener('click', function(event) {
        event.stopPropagation();
        resultBoxItems.style.display = 'block';
    });

    const searchButtonItem = document.getElementById("search-bar-item-button");

    console.log(searchButtonItem);

    searchButtonItem.addEventListener('click', async function() {
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
                suggestedItems = getSuggestions(inputBoxItem.value.trim(), allItemsNames); 
                filteredItems = searchItems(suggestedItems); 
                render_items();
                break;
            default:
                break;
        }       
    });


    console.log("Realoading7");
});



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
    console.log("Getting suggestions");
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

    if(resultBox.style.display === 'none'){
        resultBox.style.display = 'block';
    }

    console.log(resultBox);
    console.log(results); 

    resultBox.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultBox.innerHTML = '<li>No results found</li>';
        return;
    }

    const content = results.map(item => {
        if(selectedOption === 'users'){
            return "<li onclick='selectInput(this)' class='searched_item'>" + item + "</li>";
        }else{
            return "<li onclick='selectInputItem(this)' class='searched_item'>" + item + "</li>";
        }
    });

    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInputItem(element){
    document.getElementById('search-bar-item').value = element.innerHTML;
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
            if (itemContainer.classList.contains('selected')) {
                itemContainer.classList.remove('selected');
            } else {
                itemContainer.classList.add('selected');
            }
        });
        itemContainer.appendChild(deleteButton);
        // Fetch the item photo
        const itemId = item[0]; // Assuming item id is in the first index
        const itemPhotoUrl = `../assets/items/${itemId}-1.png`; // Construct the URL
        const itemPhoto = document.createElement('img');
        itemPhoto.src = itemPhotoUrl;
        itemPhoto.classList.add('item-photo');
        itemContainer.appendChild(itemPhoto);

        // Item title
        const titleElement = document.createElement('h4');
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
                selectedUsersGlobal = selectedUsersGlobal.filter(item => item !== user[0]);
                userContainer.classList.remove('selected');
                console.log("Selected items: " + selectedUsersGlobal);
            } else {
                selectedUsersGlobal.push(user[0]);
                userContainer.classList.add('selected');
                console.log("Selected items: " + selectedUsersGlobal);
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



//MISCELANEOUS PART OF THE CODE (CONDITIONS , SIZES ETC)

document.addEventListener("DOMContentLoaded", function() {

    const showAllCategoriesBtn = document.querySelector('.showAllCateogiries button');
    const showAllSubCategoriesBtn = document.querySelector('.showAllSubCateogiries button');
    const showAllSizesBtn = document.querySelector('.showAllSizes button');
    const showAllConditionsBtn = document.querySelector('.showAllConditions button');
    const addCategoryBtn = document.querySelector('.AddCategory button');
    const addSubCategoryBtn = document.querySelector('.AddSubCategory button');
    const addSizeBtn = document.querySelector('.AddSize button');
    const addConditionBtn = document.querySelector('.AddCondition button');

    // Add click event listeners to each button
    showAllCategoriesBtn.addEventListener('click', () => {
        render_categories();
    });

    showAllSubCategoriesBtn.addEventListener('click', () => {
        render_subcategories();
    });

    showAllSizesBtn.addEventListener('click', () => {
        render_sizes();
    });

    showAllConditionsBtn.addEventListener('click', () => {
        render_conditions();
    });

    addCategoryBtn.addEventListener('click', () => {
        addAdder("Category");
    });

    addSubCategoryBtn.addEventListener('click', () => {
        addAdder("SubCategory");
    });

    addSizeBtn.addEventListener('click', () => {
        addAdder("Size");
    });

    addConditionBtn.addEventListener('click', () => {
        addAdder("Condition");
    });
});


function cleanMiscelaneousStuffDiv(){
    const miscelaneousStuffDiv = document.querySelector('.miscelaneousStuff');
    miscelaneousStuffDiv.innerHTML = '';
}

function render_categories() {
    cleanMiscelaneousStuffDiv();
    showIcons();

    const deleteButton = document.getElementById("delete_button");

    deleteButton.className = "deleteCategory";

    deleteButton.style.display = "block";

    deleteButton.addEventListener('click', () => {
        deleteParameter("Categories","category");
    });

    const miscelaneousStuffDiv = document.querySelector('.miscelaneousStuff');

    allCategories.forEach(category => {

        const categoriesContainer = document.createElement('div');
        categoriesContainer.classList.add('category');
        

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'A';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            
            if (deleteButton.classList.contains('selected')) {
                deleteButton.classList.remove('selected');
                deleteButton.style.backgroundColor = 'transparent';
            } else {
                deleteButton.classList.add('selected');
                deleteButton.style.backgroundColor = '#0B6E4F';
            }
        
            if (categoriesContainer.classList.contains('selected')) {
                categoriesContainer.classList.remove('selected');
            } else {
                categoriesContainer.classList.add('selected');
            }
        });

        const categoryId = category[0];
        const categoryName = category[1];

        const ID = document.createElement('h3');
        ID.textContent = categoryId;
        
        const categoryNameElement = document.createElement('h3');
        categoryNameElement.textContent = categoryName;

        categoriesContainer.appendChild(deleteButton);
        categoriesContainer.appendChild(ID);
        categoriesContainer.appendChild(categoryNameElement);

        miscelaneousStuffDiv.appendChild(categoriesContainer);
    });
}

function render_subcategories() {
    cleanMiscelaneousStuffDiv();
    showIcons();

    const deleteButton = document.getElementById("delete_button");

    deleteButton.className = "deleteSubCategory";

    deleteButton.style.display = "block";

    deleteButton.addEventListener('click', () => {
        deleteParameter("Subcategory",'subCategory');
    });

    const miscelaneousStuffDiv = document.querySelector('.miscelaneousStuff');

    allSubCategories.forEach(subCategory => {

        const categoriesContainer = document.createElement('div');
        categoriesContainer.classList.add('subCategory');
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'A';
        deleteButton.classList.add('delete-button');
        
        deleteButton.addEventListener('click', function() {
            
            if (deleteButton.classList.contains('selected')) {
                deleteButton.classList.remove('selected');
                deleteButton.style.backgroundColor = 'transparent';
            } else {
                deleteButton.classList.add('selected');
                deleteButton.style.backgroundColor = '#0B6E4F';
            }
        
            if (subCategoryContainer.classList.contains('selected')) {
                subCategoryContainer.classList.remove('selected');
            } else {
                subCategoryContainer.classList.add('selected');
            }
        });

        const subCategoryContainer = document.createElement('div');
        subCategoryContainer.classList.add('subCategory');
        
        const subCategoryId = subCategory[0];
        const subCategoryName = subCategory[1];

        const subCategoryID = document.createElement('h3');
        subCategoryID.textContent = subCategoryId;
        
        const subCategoryNameElement = document.createElement('h3');
        subCategoryNameElement.textContent = subCategoryName;

        subCategoryContainer.appendChild(deleteButton);
        subCategoryContainer.appendChild(subCategoryID);
        subCategoryContainer.appendChild(subCategoryNameElement);

        miscelaneousStuffDiv.appendChild(subCategoryContainer);
    });
}

function render_sizes() {
    cleanMiscelaneousStuffDiv();
    showIcons();

    const deleteButton = document.getElementById("delete_button");

    deleteButton.className = "deleteSize";

    deleteButton.style.display = "block";

    deleteButton.addEventListener('click', () => {
        deleteParameter("Sizes",'size');
    });

    const miscelaneousStuffDiv = document.querySelector('.miscelaneousStuff');

    allSizes.forEach(size => {

        const sizesContainer = document.createElement('div');
        sizesContainer.classList.add('size');
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'A';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            
            if (deleteButton.classList.contains('selected')) {
                deleteButton.classList.remove('selected');
                deleteButton.style.backgroundColor = 'transparent';
            } else {
                deleteButton.classList.add('selected');
                deleteButton.style.backgroundColor = '#0B6E4F';
            }
        
            if (sizesContainer.classList.contains('selected')) {
                sizesContainer.classList.remove('selected');
            } else {
                sizesContainer.classList.add('selected');
            }
        });

        const sizeId = size[0];
        const sizeName = size[1];

        const ID = document.createElement('h3');
        ID.textContent = sizeId;
        
        const sizeNameElement = document.createElement('h3');
        sizeNameElement.textContent = sizeName;

        sizesContainer.appendChild(deleteButton);
        sizesContainer.appendChild(ID);
        sizesContainer.appendChild(sizeNameElement);

        miscelaneousStuffDiv.appendChild(sizesContainer);
    });
}

function render_conditions() {
    cleanMiscelaneousStuffDiv();
    showIcons();

    const deleteButton = document.getElementById("delete_button");

    deleteButton.className= "deleteCondition";

    deleteButton.style.display = "block";

    const miscelaneousStuffDiv = document.querySelector('.miscelaneousStuff');

    deleteButton.addEventListener('click', () => {
        deleteParameter("Conditions",'condition');
    });

    allConditions.forEach(condition => {

        const conditionContainer = document.createElement('div');
        conditionContainer.classList.add('condition');
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'A';
        deleteButton.classList.add('delete-button');
        
        deleteButton.addEventListener('click', function() {
            
            if (deleteButton.classList.contains('selected')) {
                deleteButton.classList.remove('selected');
                deleteButton.style.backgroundColor = 'transparent';
            } else {
                deleteButton.classList.add('selected');
                deleteButton.style.backgroundColor = '#0B6E4F';
            }
        
            if (conditionContainer.classList.contains('selected')) {
                conditionContainer.classList.remove('selected');
            } else {
                conditionContainer.classList.add('selected');
            }
        });

        const conditionId = condition[0];
        const conditionName = condition[1];

        const ID = document.createElement('h3');
        ID.textContent = conditionId;
        
        const sizeNameElement = document.createElement('h3');
        sizeNameElement.textContent = conditionName;

        conditionContainer.appendChild(deleteButton);
        conditionContainer.appendChild(ID);
        conditionContainer.appendChild(sizeNameElement);

        miscelaneousStuffDiv.appendChild(conditionContainer);
    });
}


function addAdder(exibitText){
    cleanMiscelaneousStuffDiv();
    hideIcons();

    const deleteButton = document.getElementById("delete_button");

    deleteButton.style.display = "none";

    const miscelaneousStuffDiv = document.querySelector('.miscelaneousStuff');

    const adder = document.createElement('div');
    adder.classList.add('adder');

    const text = document.createElement('p');
    text.innerHTML = "Please Introduce a " + exibitText;
    adder.appendChild(text);

    const input = document.createElement('input');
    input.classList.add('input');
    adder.appendChild(input);

    const addButton = document.createElement('button');
    addButton.classList.add('add-button');
    addButton.textContent = 'Add';
    adder.appendChild(addButton);

    addButton.addEventListener('click', function() {
        const inputValue = input.value.trim();
        if (inputValue !== '') {
            table: "";
            newItem: "";
            switch (exibitText) {
                case 'Category':
                        table =  "Categories";
                        newItem = inputValue;
                    break;
                case 'SubCategory':
                        table = "Subcategory";
                        newItem = inputValue;
                    break;
                case 'Size':
                        table = "Sizes";
                        newItem = inputValue;
                    break;
                case 'Condition':
                        table = "Conditions";
                        newItem = inputValue;
                    break;
                default:
                    break;
            }
            addNewItem(table,newItem);
            input.value = '';
        }
    });

    miscelaneousStuffDiv.appendChild(adder);
}

function addNewItem(table,newItem) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', "../../db_handler/action_add_new_parameter_admin.php", true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.onload = function() {
            if (xhr.status  >= 200 && xhr.status < 300) {
                const response = xhr.responseText;
                console.log('Item added successfully:', response);
                location.reload();
            } else {
                console.error('Failed to add item. Status:', xhr.status);
            }
    };
    xhr.send('table=' + encodeURIComponent(table)
        + '&newItem=' + encodeURIComponent(newItem));
 
}

function deleteParameter(table,main_class){

        const selectedItems = [];
        const miscelaneousStuffDiv = document.querySelector('.miscelaneousStuff');
        const items = miscelaneousStuffDiv.querySelectorAll("." + main_class + '.selected');
        items.forEach(item => {
            const secondH3 = item.querySelector('h3:nth-child(3)');
            selectedItems.push(secondH3.textContent);
        });

        size = 0;

        if(items.length == 1){
            itemName = selectedItems[size];

            const xhr = new XMLHttpRequest();
            xhr.open('POST', "../../db_handler/action_delete_parameter_admin.php", true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                const response = xhr.responseText;
                console.log('Parameters deleted successfully:', response);
            } else {
                console.error('Failed to delete parameters. Status:', xhr.status);
            }
            };

            xhr.send('table=' + encodeURIComponent(table)
        + '&itemName=' + encodeURIComponent(itemName));
        }

        while (size < selectedItems.length) {
            itemName = selectedItems[size];
        
            const xhr = new XMLHttpRequest();
            xhr.open('POST', "../../db_handler/action_delete_parameter_admin.php", true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const response = xhr.responseText;
                    console.log('Parameter deleted successfully:', response);
                } else {
                    console.error('Failed to delete parameter. Status:', xhr.status);
                }
            };
        
            xhr.send('table=' + encodeURIComponent(table) + '&itemName=' + encodeURIComponent(itemName));
        
            size++;
        }
}

function deleteUsers() {

    console.log(selectedUsersGlobal);

    selectedUsersGlobal.forEach(user => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', "../../db_handler/action_delete_users_admin.php", true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('id=' + encodeURIComponent(user));
    }); 

    allUsers = allUsers.filter(user => !selectedUsersGlobal.includes(user[0]));

    selectedUsersGlobal = [];

    render_users();
}

function elevateUserStatus() {

    console.log(selectedUsersGlobal);

    selectedUsersGlobal.forEach(user => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', "../../db_handler/action_elevate_user_status.php", true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('id=' + encodeURIComponent(user));
    }); 

    allUsers = allUsers.filter(user => !selectedUsersGlobal.includes(user[0]));

    selectedUsersGlobal = [];
}

function downgradeUserStatus() {

    console.log(selectedUsersGlobal);

    selectedUsersGlobal.forEach(user => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', "../../db_handler/action_downgrade_user_status.php", true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('id=' + encodeURIComponent(user));
    }); 

    allUsers = allUsers.filter(user => !selectedUsersGlobal.includes(user[0]));

    selectedUsersGlobal = [];
}

document.addEventListener("DOMContentLoaded", function() {

    const deleteButton = document.getElementById("delete_button");
    const arrowUpButton = document.getElementById("arrow_up");
    const arrowDownButton = document.getElementById("arrow_down");

    deleteButton.addEventListener('click', () => {

        switch(selectedOption){
            case 'users':
                deleteUsers();
                break;
            case 'items':
                deleteItems();
                break;
            default:
                break;
        }

    });

    arrowUpButton.addEventListener('click', () => {
        switch(selectedOption){
            case 'users':
                elevateUserStatus();
                break;
            case 'items':
                //todo
                break;
            default:
                break;
        }
    });

    arrowDownButton.addEventListener('click', () => {
        switch(selectedOption){
            case 'users':
                downgradeUserStatus();
                break;
            case 'items':
                //todo
                break;
            default:
                break;
        }
    });

});
