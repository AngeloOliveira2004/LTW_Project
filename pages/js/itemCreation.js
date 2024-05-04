let inputedImages = [];

document.addEventListener("DOMContentLoaded", function() {
  var searchInput = document.querySelector(".search_category");
  var suggestions = document.querySelector(".suggestions");

  searchInput.addEventListener("click", function() {
    suggestions.style.display = suggestions.style.display === "block" ? "none" : "block";
  });

  var suggestionOptions = document.querySelectorAll(".suggestions div");
  suggestionOptions.forEach(function(option) {
    option.addEventListener("click", function() {
      searchInput.value = option.value;
      suggestions.style.display = "none";
    });
  });

  var subSearchInput = document.querySelector(".sub_search_category");
  var subSuggestions = document.querySelector(".sub_suggestions");

  subSearchInput.addEventListener("click", function() {
    subSuggestions.style.display = subSuggestions.style.display === "block" ? "none" : "block";
  });

  var subSuggestionOptions = document.querySelectorAll(".sub_suggestions div");
  subSuggestionOptions.forEach(function(option) {
    option.addEventListener("click", function() {
      subSearchInput.value = option.value;
      subSuggestions.style.display = "none";
    });
  });

  const inputElements = document.querySelectorAll('.image_inputer');

  inputElements.forEach(inputElement => {
    inputElement.addEventListener('change', (event) => {
      console.log("image input changed");

      const file = event.target.files[0];
      inputedImages.push(file);

      const reader = new FileReader();
      let originalHolder = event.target.id;

      for (let i = 1; i <= 15; i++) {
        const imageHolder = document.getElementById('selected_image' + i);
        const src = imageHolder.src;
        const fileName = src.substring(src.lastIndexOf('/') + 1);
        console.log("Image " + i + ":", fileName);

        if (fileName === 'camera.png') {
          imageHolder.src = URL.createObjectURL(file);
          const frame = document.getElementById('image_icon' + i);
          frame.classList.remove('image_icon');
          frame.classList.add('new_image');

          frame.addEventListener('mouseenter', () => {
            const closeIcon = document.createElement('span');
            closeIcon.innerHTML = 'Remove Image';
            closeIcon.classList.add('close_icon');
            frame.appendChild(closeIcon);

            closeIcon.addEventListener('click', () => {
              imageHolder.src = '../assets/camera.png';
              frame.classList.remove('new_image');
              frame.classList.add('image_icon');
              frame.removeChild(closeIcon);
            });
          });

          frame.addEventListener('mouseleave', () => {
            const closeIcon = frame.querySelector('.close_icon');
            frame.removeChild(closeIcon);
          });

          break;
        }

        if (i === 15) {
          let originalHolderNumber = originalHolder.replace(/\D/g, '');
          let newHolder = document.getElementById('selected_image' + originalHolderNumber);
          newHolder.src = URL.createObjectURL(file);
          newHolder.style.width = '100%';
          newHolder.style.height = '100%';
          newHolder.style.objectFit = 'cover';
          break;
        }
      }
    });
  });
});
