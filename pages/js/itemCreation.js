const fileInputs = document.querySelectorAll('.image_inputer');


function displayImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function() {
    const img = document.createElement('img');
    img.src = reader.result;
    img.alt = 'Selected Image';
    document.querySelector('.selected_image').appendChild(img);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}


fileInputs.forEach(function(input) {
  input.addEventListener('change', displayImage);
});