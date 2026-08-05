document.addEventListener("DOMContentLoaded", function () {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const navActions = document.querySelector(".nav-actions");

    const createAccountBtn = document.getElementById("createAccountBtn");

    const ctaSection = document.getElementById("ctaSection");


    // If user is logged in
    if (currentUser) {


        // Change navbar
        if (navActions) {

            navActions.innerHTML = `
                <a href="user_profile.html" class="login-link">
                    My Profile
                </a>

                <a href="#" class="signup-link" id="logoutBtn">
                    Log Out
                </a>
            `;


            // Logout
            document.getElementById("logoutBtn").addEventListener("click", function(e){

                e.preventDefault();

                localStorage.removeItem("currentUser");

                window.location.href = "Landingpage.html";

            });

        }


        // Hide Create Free Account button in hero section
        if (createAccountBtn) {
            createAccountBtn.style.display = "none";
        }


        // Hide whole CTA section
        if (ctaSection) {
            ctaSection.style.display = "none";
        }

    }

});