const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const nextButton = document.getElementById('nextButton');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

nextButton.addEventListener('click', () => {
    const currentForm = document.querySelector('.form-container.active');
    currentForm.classList.remove('active');

    const nextForm = document.querySelector('.register-details');
    nextForm.classList.add('active');
});
