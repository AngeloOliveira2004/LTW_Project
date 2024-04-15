
function calculateRecommendations() {

    let reccomendations = [];

    let inputValue = scanInput();
    let inputLength = inputValue.length;
    console.log(inputLength);
    console.log(items.length);

}   

function fetchItems() {
    // Make an AJAX request to fetch items from PHP file
    fetch('../db_handler/DB.php')
        .then(response => response.json())
        .then(items => calculateRecommendations(items))
        .catch(error => console.error('Error fetching items:', error));
}

function scanInput() {

    let inputValue = document.getElementById("searchBar").value;
    
    console.log("Scanned input:", inputValue);
}

document.getElementById("executeButton").addEventListener("click", function() {
    // Call the function from the external JavaScript file
    calculateRecommendations();
});

fetchItems();