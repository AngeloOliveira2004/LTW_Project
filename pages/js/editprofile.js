document.getElementById("saveChangesBtn").addEventListener("click", function() {
    var formData = new FormData(document.getElementById("updateForm"));
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                document.getElementById("message").innerHTML = xhr.responseText;
            } else {
                document.getElementById("message").innerHTML = "Error occurred. Please try again.";
            }
    };
    
    xhr.open("POST", "../../db_handler/update_user_details.php", true);
    xhr.send(formData);
});