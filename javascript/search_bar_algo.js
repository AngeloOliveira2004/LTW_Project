
function calculateRecommendations(itemNames) {

    let reccomendations = [];

    let inputValue = scanInput();

    console.log("Scanned input:", inputValue);

    console.log(items.length);

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

