let phone_number_value_save = "";
let email_value_save = "";
let isContentHiddenEmail = true;
let isContentHiddenPassword = true;

document.addEventListener('DOMContentLoaded', function() {
    var phone_number_value = document.getElementById('user_phonenumber');
    var email_value = document.getElementById('user_email');

    phone_number_value_save = phone_number_value.textContent;
    email_value_save = email_value.textContent;
    phone_number_value.textContent = "*".repeat(phone_number_value_save.length);
    email_value.textContent = "*".repeat(email_value_save.length);
});

document.addEventListener('DOMContentLoaded', function() {
    const reveal_button = document.getElementById("reveal-num-button");
    reveal_button.addEventListener("click", toggleContent);

    function toggleContent(event) {
        const phone_number = document.getElementById("user_phonenumber");
        if (isContentHiddenPassword) {
            phone_number.textContent = phone_number_value_save;
            reveal_button.textContent = "Hide Number";
        } else {
            phone_number.textContent = "*".repeat(phone_number_value_save.length);
            reveal_button.textContent = "Reveal Number";
        }
        isContentHiddenPassword = !isContentHiddenPassword;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const reveal_button = document.getElementById("reveal-email-button");
    reveal_button.addEventListener("click", toggleContent);

    function toggleContent(event) {
        const email = document.getElementById("user_email");
        if (isContentHiddenEmail) {
            email.textContent = email_value_save;
            reveal_button.textContent = "Hide Email";
        } else {
            email.textContent = "*".repeat(email_value_save.length);
            reveal_button.textContent = "Reveal Email";
        }
        isContentHiddenEmail = !isContentHiddenEmail;
    }
});
