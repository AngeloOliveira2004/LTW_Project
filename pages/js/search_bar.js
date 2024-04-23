let lastSuggestions = [];
let allItems = [];

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
            if(button.id == 'filter_image'){
                isImageFilterActive = !isImageFilterActive;
            }
            else if(button.id == 'filter_delivery'){
                isDeliveryFilterActive = !isDeliveryFilterActive;
            }
        });
    });

    searchButton.addEventListener('click', function() {
        search_algorithm(allItems); // Call the search_algorithm function
    });

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

    allItems.filter(item => {
        // Check if the item matches the filter criteria
        const marcaMatch = marcaValue === '' || item[3] === marcaValue;
        const estadoMatch = estadoValue === '' || item[6] === estadoValue;
        const precoMatch = (precoMinValue === '' || parseFloat(item[5]) >= parseFloat(precoMinValue)) &&
                           (precoMaxValue === '' || parseFloat(item[5]) <= parseFloat(precoMaxValue));
        // Return true only if all criteria match
        return marcaMatch && estadoMatch && precoMatch;
    });

    if(isImageFilterActive){
        allItems = allItems.filter(item => item[10] !== null);
    }
    
    if(isDeliveryFilterActive){
        allItems = allItems.filter(item => item[9] === 'true');
    }

    if (sortValue === 'price_asc') {
        allItems.sort(function(a, b) {
            return parseFloat(a[5]) - parseFloat(b[5]);
        });
    } else if (sortValue === 'price_desc') {
        allItems.sort(function(a, b) {
            return parseFloat(b[5]) - parseFloat(a[5]);
        });
    }
}   