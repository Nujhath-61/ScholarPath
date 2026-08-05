const signupForm = document.getElementById("signupForm");
const message = document.getElementById("message");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const institution = document.getElementById("institution").value.trim();
    const aspirant = document.getElementById("aspirant").value;
    const address = document.getElementById("address").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const termsAccepted = document.getElementById("terms").checked;

    message.style.color = "#dc2626";

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        return;
    }

    if (!termsAccepted) {
        message.textContent = "Please accept the Terms and Conditions.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("scholarPathUsers")) || [];

    const emailAlreadyExists = users.some(function (user) {
        return user.email === email;
    });

    if (emailAlreadyExists) {
        message.textContent = "An account with this email already exists.";
        return;
    }

    const newUser = {
        id: Date.now(),
        fullName,
        phone,
        email,
        institution,
        aspirant,
        address,
        password
    };

    users.push(newUser);

    localStorage.setItem("scholarPathUsers", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    message.style.color = "#16a34a";
    message.textContent = "Account created successfully! Redirecting...";

    setTimeout(function () {
        window.location.href = "ScholarshipList.html";
    }, 900);
});