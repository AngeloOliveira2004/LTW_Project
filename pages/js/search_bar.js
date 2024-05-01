

let lastSuggestions = [];
let allItems = [];

let searched_items = [];
let current_filters = {
    "state": new Set(),
    "brand": new Set(),
    "category": new Set(),
    "subCategory": new Set(),
    "onlyAdsWithImages": false,
    "delivery": false,
};

function calculateSuggestions(inputVal , items){
    console.log('beginning suggestions');
    console.log(items);
    console.log(inputVal);

    if (inputVal.length === 0) {
        return items;
    } else {
        inputVal = inputVal.toLowerCase();
        
        allItemNames = []
        filteredItems = [...items];
        
        for(let i = 0; i < items.length; i++){
            allItemNames.push(items[i][1].toLowerCase());
        }
        
        console.log('all items names');
        console.log(allItemNames);

        let filteredItemsNames = allItemNames.filter(function (item) {
            return item.startsWith(inputVal);
        });

        console.log('filtered items');
        console.log(filteredItemsNames);
    
        let suggestionsMap = filteredItems.reduce(function (map, item) {
            var differences = 0;
            for (var i = 0; i < inputVal.length; i++) {
                if (item[i] !== inputVal[i]) {
                    differences++;
                }
            }
            map[item] = differences;
            return map;
        }, {});
        
        console.log(filteredItems);
        console.log(filteredItemsNames);

        recommendations = [];

        for(let i = 0; i < filteredItemsNames.length; i++){
            for(let j = 0; j < filteredItems.length; j++){
                if(filteredItems[j][1].toLowerCase() === filteredItemsNames[i]){
                    recommendations.push(filteredItems[j]);
                }
            }
        }

        console.log('reco')
        console.log(recommendations);
    
        return recommendations;
    }
}


function getSuggestions(input , itemNamesJson){
    var itemNames = JSON.parse(itemNamesJson);

    if (input.length < 0) {
        return [];
    } else {
        input = input.toLowerCase();
    
        itemNames = itemNames.map(function (item) {
            return item.toLowerCase();
        });
    
        let filteredItems = itemNames.filter(function (item) {
            return item.startsWith(input);
        });
    
        itemNames = itemNames.filter(function (item) {
            return !item.startsWith(input);
        });
    
        let suggestionsMap = filteredItems.reduce(function (map, item) {
            var differences = 0;
            for (var i = 0; i < input.length; i++) {
                if (item[i] !== input[i]) {
                    differences++;
                }
            }
            map[item] = differences;
            return map;
        }, {});
    
        let sortedItems = filteredItems.sort(function (a, b) {
            return Math.abs(a.length - input.length) - Math.abs(b.length - input.length);
        });
    
        let sortedMap = Object.entries(suggestionsMap).sort(function (a, b) {
            return a[1] - b[1];
        });
    
        let result = sortedItems.concat(sortedMap.map(item => item[0]));

        result = [...new Set(result)];
    
        return result;
    }
/*
    var xhr = new XMLHttpRequest();
    var url = "/search/suggestions?search=" + search;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            suggestions.innerHTML = "";
            response.forEach(function(item){
                var suggestion = document.createElement("div");
                suggestion.innerHTML = item;
                suggestion.onclick = function(){
                    document.getElementById('search').value = item;
                    suggestions.innerHTML = "";
                };
                suggestions.appendChild(suggestion);
            });
        }
    };
    xhr.send();
*/
}

document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.querySelector('.search_bar');
    const resultBox = document.querySelector('.result-box');
    const filterButtons = document.querySelectorAll('.filter_button');
    const searchButton = document.querySelector('.search_button'); 
    const marcaFilter = document.getElementById('marca_filter');
    const estadoFilter = document.getElementById('estado_filter');
    const sortFilter = document.getElementById('sort_filter');
    
    let isImageFilterActive = false;
    let isDeliveryFilterActive = false;

    console.log("Loaded");
    console.log(inputBox);


    inputBox.addEventListener('keyup' , function() {
        console.log("inputBox.onkeyup");

        let input = inputBox.value;

        let result_ = getSuggestions(input, JSON.stringify(itemNames)); 

        console.log(result_);

        if(input.length == 0){
            result_ = [];
        }
        display_result(result_);
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

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            button.classList.toggle('active');
            if(button.id == 'image_filter'){
                isImageFilterActive = !isImageFilterActive;
                current_filters['onlyAdsWithImages'] = isImageFilterActive;
            }
            else if(button.id == 'delivery_filter'){
                isDeliveryFilterActive = !isDeliveryFilterActive;
                current_filters['delivery'] = isDeliveryFilterActive;
            }
        });
    });

    searchButton.addEventListener('click', async function() {
        try {
            const response = await fetch('js/get_all_items.php');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            console.log('Data fetched successfully');
            
            const allItems = await response.json(); 
            console.log(allItems);

            items =  [...allItems];
            console.log(items);

            input = document.querySelector('.search_bar').value;
            console.log(input);
            
            const recommendad_items = calculateSuggestions(input, items);
            console.log("after suggestions");
            console.log(recommendad_items);
            search_algorithm(recommendad_items, isImageFilterActive , isDeliveryFilterActive);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    document.querySelectorAll('.filter_section select, .filter_section input').forEach(input => {
        input.addEventListener('change', updateCurrentFilters);
    });

    marcaFilter.addEventListener('change', function() {
        const selectedMarca = marcaFilter.value;
        console.log('Selected Marca:', selectedMarca);
        updateCurrentFilters(selectedMarca , 'Marca' , true);
    });

    estadoFilter.addEventListener('change', function() {
        const selectedEstado = estadoFilter.value;
        console.log('Selected Estado:', selectedEstado);
        updateCurrentFilters(selectedEstado , 'State' , true);
        
    });

    sortFilter.addEventListener('change', function() {
        const selectedSort = sortFilter.value;
        console.log('Selected Sort:', selectedSort);
        updateCurrentFilters(selectedSort , 'Sort' , true);
        
    });

    function updateCurrentFilters(input , indicator , from) {
        switch(indicator){
            case 'Marca':
                if(input === 'Marca' || input === ''){
                    current_filters['brand'].clear();
                }else{
                    current_filters['brand'].add(input);
                }

                break;
            case 'State':
                if(input == 'Any'){
                    current_filters['state'].clear();
                }else{
                    current_filters['state'].add(input);
                }
                break;
            case 'Price':
                if(from){
                    if (input !== '' && input !== '0') { 
                        current_filters['state'].add('From' + input);
                    }
                } else {
                    if (input !== '' && input !== '1000') { 
                        current_filters['state'].add('To' + input);
                    }
                }
                break;
            case 'Sort':
                if (input !== '' && input !== 'Ordenar Por') { 
                    current_filters['sort'] = input;
                }
                break;
        }
        console.log(input);
        console.log(current_filters);
        display_current_filters();
    }
        

    function display_current_filters() {
        const currentFiltersDiv = document.querySelector('.current_filters');
        currentFiltersDiv.innerHTML = ''; 
    
        for (const key in current_filters) {
            current_filters[key].forEach(value => {
                const filterEntry = document.createElement('div');
                filterEntry.textContent = `${key}: ${value}`;
    
                const removeButton = document.createElement('button');
                removeButton.textContent = 'X';
                removeButton.addEventListener('click', () => {
                    filterEntry.remove();
                    current_filters[key].delete(value);
                    console.log(current_filters);
                    display_current_filters();
                });
    
                filterEntry.appendChild(removeButton);
                currentFiltersDiv.appendChild(filterEntry);
            });
        }
    }
}); 


function display_result(result){

    const resultBox = document.querySelector('.result-box');

    const content = result.map((item) =>{
        return "<li onclick = selectInput(this) class = 'searched_item'>" + item + "</li>";
    });

    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";

}


function selectInput(element){
    document.querySelector('.search_bar').value = element.innerHTML;
}

function imageExistsAsync(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

async function search_algorithm(items , isImageFilterActive , isDeliveryFilterActive){
    
    const sortFilter = document.getElementById('sort_filter');
    const precoMin = document.querySelector('.from');
    const precoMax = document.querySelector('.to');
    
    const precoMinValue = precoMin.value;
    const precoMaxValue = precoMax.value;
    const sortValue = sortFilter.value;

    //allItems = [[Id, Name, Description, Brand, CategoryId, Size, Price, ConditionId, Available, isAvailableForDelivery, getSubCategory ,UserId ,  ] ,...]
    let size = items.length;
    let size2 = items.length;

    items = items.filter(item => {
        
        const precoMatch = (precoMinValue === '' || parseFloat(item[6]) >= parseFloat(precoMinValue)) &&
                        (precoMaxValue === '' || parseFloat(item[6]) <= parseFloat(precoMaxValue));

        const brandMatch = current_filters['brand'].size === 0 || current_filters['brand'].has(item[3]);
        const categoryMatch = current_filters['category'].size === 0 || current_filters['category'].has(item[4]);
        const stateMatch = current_filters['state'].size === 0 || current_filters['state'].has(item[7]);

        return  precoMatch && brandMatch && categoryMatch && stateMatch;
    });

    size2 = items.length;

    if(size > size2){
        console.log("marcou filter , estado filter , preço filter")
    }

    size = size2;

    if (current_filters['onlyAdsWithImages']) {
        items = await Promise.all(items.map(async (item) => {
            const filePath = `../assets/items/${item[0]}.png`;
            const imageExists = await imageExistsAsync(filePath);
            return imageExists ? item : null;
        }));
       
        items = items.filter(item => item !== null);
    }
    
    size2 = items.length;

    if(size > size2){
        console.log("price filter")
    }

    size = size2;

    if(current_filters['delivery']){
        items = items.filter(item => item[9] === 1);
    }

    size2 = items.length;

    if(size > size2){
        console.log("image filter")
    }

    size = size2;

    if (sortValue === 'price_asc') {
        items.sort(function(a, b) {
            return parseFloat(a[6]) - parseFloat(b[6]);
        });
    } else if (sortValue === 'price_desc') {
        items.sort(function(a, b) {
            return parseFloat(b[6]) - parseFloat(a[6]);
        });
    }

    console.log(items);

    searched_items = items;

    render_items();
}   

function render_items() {
    const searchItemsDiv = document.querySelector('.search-items');
    searchItemsDiv.innerHTML = '';

    // Render found items
    searched_items.forEach(item => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('searched-item-container');

        // Fetch the item photo
        const itemId = item[0]; // Assuming item id is in the first index
        const itemPhotoUrl = `../assets/items/${itemId}.png`; // Construct the URL
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
        priceElement.textContent = `${item[6]}`; // Assuming price is in the sixth index
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
function render_items() {
    const searchItemsDiv = document.querySelector('.search-items');
    searchItemsDiv.innerHTML = '';

    // Render found items
    searched_items.forEach(item => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('searched-item-container');

        // Fetch the item photo
        const itemId = item[0]; // Assuming item id is in the first index
        const itemPhotoUrl = `../assets/items/${itemId}.png`; // Construct the URL
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
