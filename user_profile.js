const profilePage = document.getElementById("profilePage");
const logoutButton = document.getElementById("logoutButton");

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

function escapeHTML(text) {
    const element = document.createElement("div");
    element.textContent = text || "";
    return element.innerHTML;
}

function getInitials(name) {
    return name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function getSavedScholarships() {
    if (!currentUser) return [];

    return JSON.parse(
        localStorage.getItem(`savedScholarships_${currentUser.id}`)
    ) || [];
}

function showProfile() {
    if (!currentUser) {
        profilePage.innerHTML = `
            <section class="not-logged-in">
                <h1>You are not logged in.</h1>
                <p>Create an account or log in to view your profile.</p>
                <a href="login.html">Log In</a>
            </section>
        `;
        return;
    }

    const savedScholarships = getSavedScholarships();

    profilePage.innerHTML = `
        <section class="profile-card">
            <div class="profile-cover"></div>

            <div class="profile-main">
                <div class="profile-top">
                    <div class="avatar">${escapeHTML(getInitials(currentUser.fullName))}</div>
                    <button class="edit-button" id="editButton">Edit Profile</button>
                </div>

                <h1 class="user-name">${escapeHTML(currentUser.fullName)}</h1>
                <p class="email">${escapeHTML(currentUser.email)}</p>

                <div class="stats">
                    <div class="stat">
                        <strong>${savedScholarships.length}</strong>
                        <span>Saved Scholarships</span>
                    </div>

                    <div class="stat">
                        <strong>${escapeHTML(currentUser.aspirant)}</strong>
                        <span>Study Level</span>
                    </div>

                    <div class="stat">
                        <strong>Active</strong>
                        <span>Account Status</span>
                    </div>
                </div>

                <div class="info-grid">
                    <div class="info-box">
                        <small>INSTITUTION</small>
                        <strong>${escapeHTML(currentUser.institution)}</strong>
                    </div>

                    <div class="info-box">
                        <small>PHONE NUMBER</small>
                        <strong>${escapeHTML(currentUser.phone)}</strong>
                    </div>

                    <div class="info-box">
                        <small>ADDRESS</small>
                        <strong>${escapeHTML(currentUser.address)}</strong>
                    </div>

                    <div class="info-box">
                        <small>EMAIL ADDRESS</small>
                        <strong>${escapeHTML(currentUser.email)}</strong>
                    </div>
                </div>
            </div>
        </section>

        <section class="saved-section">
            <div class="section-top">
                <h2>Saved Scholarships</h2>
                <a href="ScholarshipList.html">Find more →</a>
            </div>

            <div class="saved-list" id="savedList"></div>
        </section>

       <div class="modal hidden" id="editSection">
    <div class="modal-content">

        <button type="button" class="close-modal" id="closeModal">
            &times;
        </button>

        <h2>Edit Profile</h2>

        <form id="editForm">

            <div class="form-row">
                <div class="input-group">
                    <label for="editName">Full Name</label>
                    <input id="editName" required>
                </div>

                <div class="input-group">
                    <label for="editPhone">Phone Number</label>
                    <input id="editPhone" required>
                </div>
            </div>

            <div class="form-row">
                <div class="input-group">
                    <label for="editInstitution">Institution</label>
                    <input id="editInstitution" required>
                </div>

                <div class="input-group">
                    <label for="editLevel">Study Level</label>
                    <select id="editLevel">
                        <option>Undergraduate</option>
                        <option>Master's</option>
                        <option>PhD</option>
                    </select>
                </div>
            </div>

            <div class="input-group">
                <label for="editAddress">Address</label>
                <input id="editAddress" required>
            </div>

            <button class="save-button" type="submit">
                Save Changes
            </button>

        </form>

    </div>
</div>

    `;

    displaySavedScholarships();

    document.getElementById("editName").value = currentUser.fullName;
    document.getElementById("editPhone").value = currentUser.phone;
    document.getElementById("editInstitution").value = currentUser.institution;
    document.getElementById("editLevel").value = currentUser.aspirant;
    document.getElementById("editAddress").value = currentUser.address;

    document.getElementById("editButton").addEventListener("click", function () {
        document.getElementById("editSection").classList.toggle("hidden");
    });

    document.getElementById("editForm").addEventListener("submit", saveProfile);
}

function displaySavedScholarships() {
    const savedList = document.getElementById("savedList");
    const savedScholarships = getSavedScholarships();

    if (savedScholarships.length === 0) {
        savedList.innerHTML = `
            <p class="empty-message">
                You have not saved any scholarships yet.
            </p>
        `;
        return;
    }

    savedList.innerHTML = savedScholarships.map((item, index) => `
        <article class="saved-card">
            <div>
                <h3>${escapeHTML(item.name || item.title)}</h3>
                <p>📍 ${escapeHTML(item.location || "Location not specified")}</p>
            </div>

            <div class="saved-actions">
                <button onclick="viewSavedScholarship(${index})">View</button>
                <button class="remove" onclick="removeSavedScholarship(${index})">Remove</button>
            </div>
        </article>
    `).join("");
}

function viewSavedScholarship(index) {
    const savedScholarships = getSavedScholarships();

    localStorage.setItem(
        "selectedScholarship",
        JSON.stringify(savedScholarships[index])
    );

    window.location.href = "details.html";
}

function removeSavedScholarship(index) {
    const savedScholarships = getSavedScholarships();

    savedScholarships.splice(index, 1);

    localStorage.setItem(
        `savedScholarships_${currentUser.id}`,
        JSON.stringify(savedScholarships)
    );

    showProfile();
}

function saveProfile(event) {
    event.preventDefault();

    currentUser.fullName = document.getElementById("editName").value.trim();
    currentUser.phone = document.getElementById("editPhone").value.trim();
    currentUser.institution = document.getElementById("editInstitution").value.trim();
    currentUser.aspirant = document.getElementById("editLevel").value;
    currentUser.address = document.getElementById("editAddress").value.trim();

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    const users = JSON.parse(localStorage.getItem("scholarPathUsers")) || [];

    const updatedUsers = users.map(user =>
        user.id === currentUser.id ? currentUser : user
    );

    localStorage.setItem("scholarPathUsers", JSON.stringify(updatedUsers));

    showProfile();
}

logoutButton.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "Landingpage.html";
});

showProfile();