document.addEventListener('DOMContentLoaded', function() {
    const reveal_button = document.getElementById("profile-picture");
    reveal_button.addEventListener("change", previewAndUploadImage);
});

function previewAndUploadImage(event) {
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('profile_image', file);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../../db_handler/upload_image.php');
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            document.getElementById('profile-image').src = xhr.responseText;
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.send(formData);
}
