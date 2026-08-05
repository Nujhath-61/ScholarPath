const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
const passwordInput = document.getElementById("password");
const showPassword = document.getElementById("showPassword");

showPassword.addEventListener("change", function () {
    if (showPassword.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = passwordInput.value;

    const users = JSON.parse(localStorage.getItem("scholarPathUsers")) || [];

    const matchedUser = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (!matchedUser) {
        message.textContent = "Incorrect email or password.";
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(matchedUser));

    message.style.color = "#16a34a";
    message.textContent = "Login successful! Redirecting...";

    setTimeout(function () {
        window.location.href = "user_profile.html";
    }, 700);
});