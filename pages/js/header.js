$(document).ready(function() {
    // Get the navbar height when the document is ready
    var navbarHeight = $('header').outerHeight();

    // Set up the scroll event listener
    $(window).scroll(function(event) {
        // Log scrolling details
        console.log('scrolling');
        console.log(navbarHeight);
        console.log($(this).scrollTop());
    });

    // Function to handle scrolling
    function hasScrolled() {
        var st = $(this).scrollTop();
        console.log('hasScrolled');
    }

    // Set up an interval function to check if scrolling occurred
    setInterval(function() {
        // Check if scrolling occurred
        if (didScroll) {
            // Call the hasScrolled function
            hasScrolled();
            // Reset the didScroll flag
            didScroll = false;
        }
    }, 250);

    // Set up the click event listener for the search button
    $('.search_button').click(function() {

        console.log('search button clicked');
        // Retrieve the values of the search bar and dropdown menu
        var searchBarValue = $('.search_bar').val();
        var categoryDropdownValue = $('.category_dropdown').val();
    
        console.log(categoryDropdownValue);
        
        if(categoryDropdownValue === 'Todas as Categorias' || categoryDropdownValue === "") {
            categoryDropdownValue = 'All';
        }
        // Log the values
        console.log('Search bar value: ' + searchBarValue);
        console.log('Category dropdown value: ' + categoryDropdownValue);

        var searchPageURL = 'search_page.php?search=' + encodeURIComponent(searchBarValue) + '&category=' + encodeURIComponent(categoryDropdownValue);

        // Redirect to the search page
        window.location.href = searchPageURL;
    });
});