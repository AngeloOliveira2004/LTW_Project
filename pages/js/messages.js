function displayMessages(messages) {
}

document.addEventListener("DOMContentLoaded", function() {
    var users = document.querySelectorAll('.user-box');
    users.forEach(function(user) {
        user.addEventListener('click', function() {
            var senderId = user.getAttribute('data-user-id');
            fetchMessagesFromSender(senderId);
        });
    });
});

function fetchMessagesFromSender(senderId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../db_handler/fetch_messages.php?senderId=' + senderId, true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText);
            let messages = JSON.parse(xhr.responseText);
            displayMessages(messages);
        }
    };
    xhr.send();
}


// document.addEventListener('DOMContentLoaded', function() {
//     const send_button = document.querySelector(".user-message-button");
//     send_button.addEventListener('click',function(){
//         let userId = this.dataset.userid;

//         //Cria um objeto do tipo XHR
//         let xhr = new XMLHttpRequest();

//         //Abre um type, url/file ou async
//         let url = "../../db_handler/fetch_messages.php?userId" + userId;

//         xhr.open('GET',url,true);

//         xhr.onload = function(){
//             if(this.status >= 200 && this.status < 300){ //Significa que funcionou (OK)

//                 let data = JSON.parse(xhr.responseText);

//                 displayMessage(data);
                
//             }else{
//                 console.error('Request failed with status:', xhr.status); //Request falhou
//             }
//         }

//         xhr.send();

//     });
// });