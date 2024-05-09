document.addEventListener('DOMContentLoaded', function() {
    const reveal_button = document.getElementById("profile-picture");
    reveal_button.addEventListener("change", previewAndUploadImage);

    const clearButton = document.getElementById("profile-picture");
    clearButton.addEventListener("click", clearInputFile);
});

function previewAndUploadImage(event) {
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('profile_image', file);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../db_handler/upload_image.php');
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            let imageUrl = xhr.responseText + '?' + Math.random();
            document.getElementById('profile-image').src = imageUrl;
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.send(formData);
}

function clearInputFile(event) {
    const inputFile = document.getElementById("profile-picture");

    if (inputFile.files.length > 0) {
        inputFile.value = '';
    }

    event.target.files[0] = '';
}
