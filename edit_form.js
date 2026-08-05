const form = document.getElementById("editScholarshipForm");
const message = document.getElementById("message");

const titleInput = document.getElementById("title");
const locationInput = document.getElementById("location");
const deadlineInput = document.getElementById("deadline");
const linkInput = document.getElementById("link");
const descriptionInput = document.getElementById("description");

// Gets the scholarship number from a URL such as:
// edit_form.html?index=0
const urlParameters = new URLSearchParams(window.location.search);
const scholarshipIndex = Number(urlParameters.get("index"));

const scholarships = JSON.parse(localStorage.getItem("list")) || [];

function showScholarshipDetails() {
    // If the user opens this page without a correct scholarship index
    if (
        !Number.isInteger(scholarshipIndex) ||
        scholarshipIndex < 0 ||
        scholarshipIndex >= scholarships.length
    ) {
        message.textContent = "Scholarship not found. Please return to the dashboard.";
        form.style.display = "none";
        return;
    }

    const scholarship = scholarships[scholarshipIndex];

    titleInput.value = scholarship.title || "";
    locationInput.value = scholarship.location || "";
    deadlineInput.value = scholarship.deadline || "";
    linkInput.value = scholarship.link || "";
    descriptionInput.value = scholarship.description || "";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!titleInput.value.trim() || !locationInput.value.trim()) {
        message.textContent = "Please complete the required fields.";
        return;
    }

    scholarships[scholarshipIndex] = {
        ...scholarships[scholarshipIndex],
        title: titleInput.value.trim(),
        location: locationInput.value.trim(),
        deadline: deadlineInput.value,
        link: linkInput.value.trim(),
        description: descriptionInput.value.trim()
    };

    localStorage.setItem("list", JSON.stringify(scholarships));

    message.style.color = "#16a34a";
    message.textContent = "Scholarship updated successfully!";

    setTimeout(function () {
        window.location.href = "admin_main.html";
    }, 700);
});

showScholarshipDetails();