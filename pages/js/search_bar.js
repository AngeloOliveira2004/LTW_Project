let lastSuggestions = [];
let allItems = [];

let searched_items = [];
let current_filters = {
    "state": new Set(),
    "brand": new Set(),
    "category": new Set()
};

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
    const filterImage = document.getElementById('filter_image');
    const deliveryFilter = document.getElementById('filter_delivery');
    const marcaFilter = document.getElementById('marca_filter');
    const estadoFilter = document.getElementById('estado_filter');
    const precoFilter = document.getElementById('preco_filter');
    const sortFilter = document.getElementById('sort_filter');
    
    // Booleans to check if buttons are active
    let isImageFilterActive = false;
    let isDeliveryFilterActive = false;

    console.log("Loaded");
    console.log(inputBox);


    inputBox.addEventListener('keyup' , function() {
        console.log("inputBox.onkeyup");

        let input = inputBox.value;

        let result_ = getSuggestions(input, JSON.stringify(itemNames)); // Pass input along with itemNamesJson

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
            }
            else if(button.id == 'delivery_filter'){
                isDeliveryFilterActive = !isDeliveryFilterActive;
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
            
            search_algorithm(allItems, isImageFilterActive , isDeliveryFilterActive);
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
        updateCurrentFilters(selectedMarca.input , 'Marca' , true);
    });

    estadoFilter.addEventListener('change', function() {
        const selectedEstado = estadoFilter.value;
        console.log('Selected Estado:', selectedEstado);
        updateCurrentFilters(selectedEstado.input , 'State' , true);
        
    });

    fromPriceInput.addEventListener('change', function() {
        const fromPrice = fromPriceInput.value;
        console.log('From Price:', fromPrice);
        updateCurrentFilters(fromPrice.input , 'Price' , true);
        
    });

    toPriceInput.addEventListener('change', function() {
        const toPrice = toPriceInput.value;
        console.log('To Price:', toPrice);
        updateCurrentFilters(toPrice.input , 'Price' , false);
    });

    sortFilter.addEventListener('change', function() {
        const selectedSort = sortFilter.value;
        console.log('Selected Sort:', selectedSort);
        updateCurrentFilters(selectedSort.input , 'Sort' , true);
        
    });

    function updateCurrentFilters(input , indicator , from) {

        switch(indicator){
            case 'Marca':
                currentFiltersDiv = document.querySelector('.current_filters');
                currentFiltersDiv.innerHTML = '';
                
                if (input.value !== '' && input.value !== 'Marca') {
                    const filterEntry = document.createElement('div');
                    filterEntry.textContent = input.value;

                    const removeButton = document.createElement('button');
                    removeButton.textContent = 'X';
                    removeButton.addEventListener('click', () => {
                        filterEntry.remove();
                        current_filters['brand'].delete(value);
                    });
                    filterEntry.appendChild(removeButton);
                    currentFiltersDiv.appendChild(filterEntry);

                    current_filters['brand'].add(input);
                }

                break;
            case 'State':
                currentFiltersDiv = document.querySelector('.current_filters');
                currentFiltersDiv.innerHTML = '';
                
                document.querySelectorAll('.filter_section select, .filter_section input').forEach(input => {
                    if (input.value !== '' && input.value !== 'Any') { 
                        const filterEntry = document.createElement('div');
                        filterEntry.textContent = input.value;
            
                        const removeButton = document.createElement('button');
                        removeButton.textContent = 'X';
                        removeButton.addEventListener('click', () => {
                            filterEntry.remove();
                            current_filters['state'].delete(value);
                        });
                        filterEntry.appendChild(removeButton);
            
                        currentFiltersDiv.appendChild(filterEntry);

                        current_filters['state'].add(value);
                    }
                });
                break;
            case 'Price':
                if(from){
                    currentFiltersDiv = document.querySelector('.current_filters');
                    currentFiltersDiv.innerHTML = '';
                    
                    document.querySelectorAll('.filter_section select, .filter_section input').forEach(input => {
                        if (input.value !== '' && input.value !== '0') { 
                            const filterEntry = document.createElement('div');
                            filterEntry.textContent = input.value;
                
                            const removeButton = document.createElement('button');
                            removeButton.textContent = 'X';
                            removeButton.addEventListener('click', () => {
                                filterEntry.remove();
                                current_filters['state'].delete('From' + value);
                            });
                            filterEntry.appendChild(removeButton);
                
                            currentFiltersDiv.appendChild(filterEntry);
                            current_filters['state'].add('From' + value);
                        }
                    });
                }else{
                    currentFiltersDiv = document.querySelector('.current_filters');
                    currentFiltersDiv.innerHTML = '';
                    
                    document.querySelectorAll('.filter_section select, .filter_section input').forEach(input => {
                        if (input.value !== '' && input.value !== '1000') { 
                            const filterEntry = document.createElement('div');
                            filterEntry.textContent = input.value;
                
                            const removeButton = document.createElement('button');
                            removeButton.textContent = 'X';
                            removeButton.addEventListener('click', () => {
                                filterEntry.remove();
                                current_filters['state'].delete('To' + value);
                            });
                            filterEntry.appendChild(removeButton);
                
                            currentFiltersDiv.appendChild(filterEntry);

                            current_filters['state'].add('To' + value);
                        }
                    });
                }
                break;
            case 'Sort':
                currentFiltersDiv = document.querySelector('.current_filters');
                currentFiltersDiv.innerHTML = '';
                
                document.querySelectorAll('.filter_section select, .filter_section input').forEach(input => {
                    if (input.value !== '' && input.value !== 'Ordenar Por') { 
                        const filterEntry = document.createElement('div');
                        filterEntry.textContent = input.value;
            
                        const removeButton = document.createElement('button');
                        removeButton.textContent = 'X';
                        removeButton.addEventListener('click', () => {
                            filterEntry.remove();
                            current_filters['state'].delete(value);
                        });
                        filterEntry.appendChild(removeButton);
            
                        currentFiltersDiv.appendChild(filterEntry);
                        current_filters['state'].add(value);
                    }
                });
                break;
        }
    }    
}); 


function display_result(result){

    const resultBox = document.querySelector('.result-box');

    const content = result.map((item) =>{
        return "<li onclick = selectInput(this)>" + item + "</li>";
    });

    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";

}


function selectInput(element){
    document.querySelector('.search_bar').value = element.innerHTML;
}


function search_algorithm(allItems , isImageFilterActive , isDeliveryFilterActive){
    
    const marcaFilter = document.getElementById('marca_filter');
    const estadoFilter = document.getElementById('estado_filter');
    const precoFilter = document.getElementById('preco_filter');
    const sortFilter = document.getElementById('sort_filter');
    const precoMin = document.querySelector('.from');
    const precoMax = document.querySelector('.to');
    
    const marcaValue = marcaFilter.value;
    const estadoValue = estadoFilter.value;
    const precoMinValue = precoMin.value;
    const precoMaxValue = precoMax.value;
    const sortValue = sortFilter.value;

    console.log("Image Filter:", isImageFilterActive);
    console.log("Delivery Filter:", isDeliveryFilterActive);
    console.log("Marca:", marcaValue);
    console.log("Estado:", estadoValue);
    console.log("Preço Mínimo:", precoMinValue);
    console.log("Preço Máximo:", precoMaxValue);
    console.log("Ordenar por:", sortValue);
    console.log('buttonClicked');
    //allItems = [[Id, Name, Description, Brand, Category, Price, Condition, Available, UserId , Deliverable ,photo_img_col] ,...]

    let size = allItems.length;
    let size2 = allItems.length;
    allItems = allItems.filter(item => {

        const marcaMatch = marcaValue === '' || item[3] === marcaValue;
        const estadoMatch = estadoValue === 'Any' || item[6] === estadoValue;
        const precoMatch = (precoMinValue === '' || parseFloat(item[5]) >= parseFloat(precoMinValue)) &&
                        (precoMaxValue === '' || parseFloat(item[5]) <= parseFloat(precoMaxValue));

        return marcaMatch && precoMatch && estadoMatch ;
    });

    size2 = allItems.length;

    if(size > size2){
        console.log("marca filter , estado filter , preço filter")
    }

    size = size2;

    if(isImageFilterActive){
        allItems = allItems.filter(item => item[10] !== null);
    }
    
    size2 = allItems.length;

    if(size > size2){
        console.log("price filter")
    }

    size = size2;

    if(isDeliveryFilterActive){
        allItems = allItems.filter(item => item[9] === 'true');
    }

    size2 = allItems.length;

    if(size > size2){
        console.log("image filter")
    }

    size = size2;

    if (sortValue === 'price_asc') {
        allItems.sort(function(a, b) {
            return parseFloat(a[5]) - parseFloat(b[5]);
        });
    } else if (sortValue === 'price_desc') {
        allItems.sort(function(a, b) {
            return parseFloat(b[5]) - parseFloat(a[5]);
        });
    }

    console.log(allItems);

    searched_items = allItems;

    render_items();
}   

function render_items(){
    const searchItemsDiv = document.querySelector('.search-items');
    searchItemsDiv.innerHTML = '';

    // Render found items
    searched_items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('searched-item');

        const nameElement = document.createElement('h3');
        nameElement.textContent = item[1]; // Assuming the item name is in the second index

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: ${item[5]}`; // Assuming the price is in the sixth index

        const brandElement = document.createElement('p');
        brandElement.textContent = `Brand: ${item[3]}`; // Assuming the brand is in the fourth index

        itemElement.appendChild(nameElement);
        itemElement.appendChild(priceElement);
        itemElement.appendChild(brandElement);

        searchItemsDiv.appendChild(itemElement);
    });
}