function displayMessages(messages) {
    let messagesContainer = document.querySelector('.user-messages');
    messagesContainer.innerHTML = '';

    messages.forEach(function(message) {
        let messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        let messageText = message.text;
        let timestamp = message.timestamp;

        let messageHTML = `
            <div class="message-content">${messageText}</div>
            <div class="message-timestamp">${timestamp}</div>
        `;

        messageDiv.innerHTML = messageHTML;

        messagesContainer.appendChild(messageDiv);
    });
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
            let messages = JSON.parse(xhr.responseText);
            displayMessages(messages);
        }
    };
    xhr.send();
}