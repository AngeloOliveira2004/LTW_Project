
document.addEventListener("DOMContentLoaded", function() {
    const logoutLinks = document.querySelectorAll('[id="logout1"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            handleLogout();
            const url = this.getAttribute('href');
            setTimeout(() => {
                window.location.href = url; 
            }, 100); 
        });
    });

    function handleLogout() {
        window.location.href = '../../db_handler/action_logout.php';
    }


    const logoutLinks2 = document.querySelectorAll('[id="logout2"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            handleLogout();
            const url = this.getAttribute('href');
            setTimeout(() => {
                window.location.href = url; 
            }, 100); 
        });
    });

    function handleLogout() {
        window.location.href = '../../db_handler/action_exit.php';
    }
});