let lastSuggestions = [];

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
            // Toggle 'active' class for the clicked button
            button.classList.toggle('active');
        });
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