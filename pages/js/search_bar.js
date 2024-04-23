
function getSuggestions(itemNames){

    var search = $('.search_bar').val();

    if(search.lenght < 2){
        return;
    }else{
        search = search.toLowerCase();

        itemNames = itemNames.map(function(item) {
            return item.toLowerCase();
        });

        let filteredItems = itemNames.filter(function(item) {
            return item.startsWith(search);
        });

        itemNames = itemNames.filter(function(item) {
            return !item.startsWith(search);
        });

        let suggestionsMap = filteredItems.reduce(function(map, item) {
            var differences = 0;
            for (var i = 0; i < search.length; i++) {
                if (item[i] !== search[i]) {
                    differences++;
                }
            }
            map[item] = differences;
            return map;
        }, {});

        let sortedItems = filteredItems.sort(function(a, b) {
            return Math.abs(a.length - search.length) - Math.abs(b.length - search.length);
        });

        let sortedMap = Object.entries(suggestionsMap).sort(function(a, b) {
            return a[1] - b[1];
        });

        
    }


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

}