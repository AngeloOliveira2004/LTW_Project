
function calculateRecommendations(itemNames) {

    let dict = {};
    let inputValue = scanInput();


    for(let i = 0; i < itemNames.length; i++) {
        let itemName = itemNames[i];
        dict[itemName] = 0;
    }

    for(let i = 0 ; i < inputValue.length; i++) {
        let char = inputValue[i];
        for(let j = 0; j < itemNames.length; j++) {
            let itemName = itemNames[j];
            if(itemName.includes(char)) {
                dict[itemName] += 3;
            }
            if (char === itemName[i]) {
                dict[itemName] += 10;
            }
        }
    }

    // Sort itemNames by corresponding dict value
    let sortedItemNames = itemNames.sort((a, b) => dict[b] - dict[a]);

    // Print sorted itemNames
    console.log("Sorted item names:", sortedItemNames);

    console.log("Scanned input:", inputValue);
    console.log(itemNames.length);
}   

function fetchItems() {
    // Make an AJAX request to fetch items from PHP file

    console.log("Fetching items from DB...");
    fetch('../db_handler/ajax_handler.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: 'action=getItemsName'
    })
    .then(response => response.json())
    .then(itemNames => {
        console.log("Fetched item names:", itemNames);
        // Process the array of item names as needed
        calculateRecommendations(itemNames);
    })
    .catch(error => console.error('Error fetching items:', error));
}


/*
function fetchItems() {
    // Make an AJAX request to fetch items from PHP file
    console.log("Fetching items from DB...")
    fetch('../db_handler/tester.php')
        .then(response => response.json())
        .then(itemNames => {
            console.log("Fetched item names:", itemNames);
            // Process the array of item names as needed
            calculateRecommendations(itemNames);
        })
        .catch(error => console.error('Error fetching items:', error));
}*/

function scanInput() {
    let inputValue = document.getElementById("searchBar").value;
    return inputValue;
}

document.getElementById("executeButton").addEventListener("click", function() {
    // Call the function from the external JavaScript file
    fetchItems();
});

