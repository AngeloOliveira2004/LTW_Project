let inputedImages = [];


document.addEventListener("DOMContentLoaded", function(){

  const inputElements = document.querySelectorAll('.image_inputer');

  
  inputElements.forEach(inputElement => {
    inputElement.addEventListener('change', (event) => {

        console.log("image input changed");

        const file = event.target.files[0];
        
        inputedImages.push(file);

        const reader = new FileReader();

        let originalHolder =  event.target.id;
       

        for (let i = 1; i <= 15; i++) {

          const imageHolder = document.getElementById('selected_image' + i);
          
          const src = imageHolder.src;
      
          const fileName = src.substring(src.lastIndexOf('/') + 1);
      
          console.log("Image " + i + ":", fileName);
          
          if (fileName === 'camera.png') {
              imageHolder.src = URL.createObjectURL(file);

              
              break;
          }
          
          if (i === 15) {
            let originalHolderNumber = originalHolder.replace(/\D/g, '');
            let newHolder = document.getElementById('selected_image' + originalHolderNumber);
            newHolder.src = URL.createObjectURL(file);
            newHolder.classList.add('selected_image_whole');
            break;
          }
      }
      
/*
        const imageElementId = event.target.id.replace('image', 'selected_image');
        const imageElement = document.getElementById(imageElementId);

        reader.onload = function(e) {
            imageElement.src = e.target.result;
        };

        reader.readAsDataURL(file);
*/
    });
  });

});
