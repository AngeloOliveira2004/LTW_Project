let senderId;
let itemId;


function displayMessages(messages) {
    let messagesContainer = document.querySelector('.user-messages');
    messagesContainer.innerHTML = '';

    messages.forEach(function(message) {
        let messageDiv = document.createElement('div');


        let receiverId = message.receiver.Id;
        let senderId2 = message.sender.Id;
        let messageText = message.text;
        let timestamp = message.timestamp;

        if(receiverId == senderId){
            messageDiv.classList.add('message-sent');
        }else{
            messageDiv.classList.add('message-received');
        }

        let messageHTML = `
            <img src="../assets/users/${senderId2}.png">
            <div class="message-content">${messageText}</div>
            <div class="message-timestamp">${timestamp}</div>
        `;

        messageDiv.innerHTML = messageHTML;

        messagesContainer.appendChild(messageDiv);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    let users = document.querySelectorAll('.user-box');
    users.forEach(function(user) {
        user.addEventListener('click', function() {
            senderId = user.getAttribute('data-user-id');
            itemId = user.getAttribute('data-item-id');
            fetchMessagesFromSender(senderId);
        });
    });
});

function fetchMessagesFromSender(senderId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../db_handler/fetch_messages.php?senderId=' + senderId, true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            let messages = JSON.parse(xhr.responseText);
            displayMessages(messages);
        }
    };
    xhr.send();
}


document.addEventListener("DOMContentLoaded", function(){
    const messageForm = document.querySelector('.text-box');
    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const messageInput = document.getElementById('user-message-input').value;

        if (messageInput.trim() === '') {
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../../db_handler/action_send_message.php', true);

        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log(xhr.responseText);
            }
        };
        xhr.send('message=' + encodeURIComponent(messageInput)
        + '&receiverId=' + encodeURIComponent(senderId)
        + '&itemId=' + encodeURIComponent(itemId));

        const userMessageInput = document.getElementById('user-message-input');

        userMessageInput.value = "";

        fetchMessagesFromSender(senderId);

    });

});