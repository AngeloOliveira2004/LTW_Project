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



document.addEventListener("DOMContentLoaded", function() {
  var searchInput = document.querySelector(".search_category");
  var suggestions = document.querySelector(".suggestions");
  var suggestionOptions = suggestions.querySelectorAll(".category-option");

  searchInput.addEventListener("input", function() {
      var searchText = searchInput.value.toLowerCase();
      suggestionOptions.forEach(function(option) {
          var optionText = option.textContent.toLowerCase();
          if (optionText.includes(searchText)) {
              option.style.display = "block";
          } else {
              option.style.display = "none";
          }
      });
  });

  suggestionOptions.forEach(function(option) {
      option.addEventListener("click", function() {
          searchInput.value = option.textContent;
          suggestions.style.display = "none";
      });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  var subSearchInput = document.querySelector(".sub_search_category");
  var subSuggestions = document.querySelector(".sub_suggestions");
  var subSuggestionOptions = subSuggestions.querySelectorAll(".subcategory-option");

  subSearchInput.addEventListener("input", function() {
      var searchText = subSearchInput.value.toLowerCase();
      subSuggestionOptions.forEach(function(option) {
          var optionText = option.textContent.toLowerCase();
          if (optionText.includes(searchText)) {
              option.style.display = "block";
          } else {
              option.style.display = "none";
          }
      });
  });

  subSuggestionOptions.forEach(function(option) {
      option.addEventListener("click", function() {
          subSearchInput.value = option.textContent;
          subSuggestions.style.display = "none";
      });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  var subSearchInput = document.querySelector(".sub_search_category");

  subSearchInput.addEventListener("click", function() {
      var inputValue = subSearchInput.value.trim(); 
    
      if (inputValue === "") {
          alert("You must pick a valid category first.");
      }
  });
});


document.addEventListener("DOMContentLoaded", function() {
  var titleInput = document.querySelector(".Item-Title");
  var wordCount = document.querySelector(".word-count");

  titleInput.addEventListener("input", function(event) {
      var inputLength = titleInput.value.length;

      wordCount.textContent = inputLength + "/50 letras";

      if (inputLength >= 50) {
          event.preventDefault();
          titleInput.value = titleInput.value.substring(0, 50);
      }
  });
});


document.addEventListener("DOMContentLoaded", function() {
  var descriptionInput = document.querySelector(".description-text");
  var wordCount = document.querySelector(".word-counter");


  descriptionInput.addEventListener("input", function() {
      var words = descriptionInput.value.trim().split(/\s+/).filter(Boolean); 
      var wordLength = words.length;

      wordCount.textContent = wordLength + "/200 palavras";

      if (wordLength > 200) {
          event.preventDefault();
          descriptionInput.value = words.slice(0, 200).join(" ");
          
      }
  });
});



document.addEventListener("DOMContentLoaded", function() {
  var tamanhoInput = document.querySelector(".Tamanho");
  var tamanhoDropdown = document.querySelector(".sizes");
  var estadoInput = document.querySelector(".Estado");
  var conditionsDropdown = document.querySelector(".conditions");

  
  tamanhoInput.addEventListener("click", function() {
      tamanhoDropdown.style.display = tamanhoDropdown.style.display === "block" ? "none" : "block";
  });


  estadoInput.addEventListener("click", function() {
      conditionsDropdown.style.display = conditionsDropdown.style.display === "block" ? "none" : "block";
  });

  tamanhoInput.addEventListener("keydown", function(event) {
      event.preventDefault();
  });

  estadoInput.addEventListener("keydown", function(event) {
      event.preventDefault();
  });

  tamanhoDropdown.addEventListener("click", function(event) {
    var clickedElement = event.target.closest("li.size_list");
    if (clickedElement) {
        tamanhoInput.value = clickedElement.textContent;
        tamanhoDropdown.style.display = "none";
    }
});

conditionsDropdown.addEventListener("click", function(event) {
    var clickedElement = event.target.closest("li.condition_list");
    if (clickedElement) {
        estadoInput.value = clickedElement.textContent;
        conditionsDropdown.style.display = "none";
    }
});

});


document.addEventListener("DOMContentLoaded", function() {
  var publicarBtn = document.querySelector(".Publicar");

  publicarBtn.addEventListener("click", function() {
      // Gather all the information from the form fields
      var title = document.querySelector(".Item-Title").value;
      var category = document.querySelector(".search_category").value;
      var subCategory = document.querySelector(".sub_search_category").value;
      var description = document.querySelector(".description-text").value;
      var price = document.querySelector(".Preço_").value;
      var negociavel = document.querySelector(".toggle-button-wrapper input[type='checkbox']").checked;
      var tamanho = document.querySelector(".Tamanho").value;
      var marca = document.querySelector(".Marca").value;
      var estado = document.querySelector(".Estado").value;

      if (title.trim() === "" || category.trim() === "" || description.trim() === "" || price.trim() === "" || marca.trim() === "" || estado.trim() === "") {
          alert("Por favor, preencha todos os campos obrigatórios.");
          return;
      }


      let numberOfImages = 0;
      let imageFiles = [];

      for (let i = 1; i <= 15; i++) {
        const imageHolder = document.getElementById('selected_image' + i);
        const src = imageHolder.src;
        const fileName = src.substring(src.lastIndexOf('/') + 1);

        if (fileName === 'camera.png') {
          continue;
        } else {
          numberOfImages++;
          imageFiles.push(imageHolder.files[0]);
        }
      }

      inputedImages.forEach(function(image, index) {
        if (image.name !== 'camera.png') {

          var formData = new FormData();
          
          formData.append('image', image);
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '../assets', true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              console.log('Image ' + (index + 1) + ' saved successfully');
            }
          };
          xhr.send(formData);
        }
      });

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "js/add_item.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              console.log(xhr.responseText);
          }
      };
      xhr.send("title=" + encodeURIComponent(title) + "&category=" + encodeURIComponent(category) + "&subCategory=" + encodeURIComponent(subCategory) + "&description=" + encodeURIComponent(description) + "&price=" + encodeURIComponent(price) + "&negociavel=" + (negociavel ? "1" : "0") + "&tamanho=" + encodeURIComponent(tamanho) + "&marca=" + encodeURIComponent(marca) + "&estado=" + encodeURIComponent(estado)
        + "&imagesSizes=" + numberOfImages + "&images=" + imageFiles);
      
  });
});
