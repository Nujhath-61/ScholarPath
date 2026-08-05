
const page1 = [
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQApMxK-CUTD5mNAPacjbr5LKNrxCmA_5Nj1vf4O0v9YA&s=10",
        name: "Knight-Hennessy Scholars",
        available_program: "MA, MBA, MD, MS, PhD",
        location: "Stanford, California 94305"
    },
    {
        image: "https://media.studentcrowd.net/w1200/index-data/20240110143013-campus-hammersmith-1-tojpeg-1417716218508-x4.jpg",
        name: "Commonwealth Scholarship",
        available_program: "Master's, PhD",
        location: "UK"
    },
    {
        image: "https://www.utm.my/about/wp-content/uploads/sites/554/2025/10/MGM8264-1280x853.jpg",
        name: "Malaysia International Scholarship (MIS)",
        available_program: "Master's, PhD",
        location: "Malaysia"
    }
];

const page2 = [
    {
        image: "https://images.unsplash.com/photo-1621519604512-85ea63c15ca2?q=80&w=779&auto=format&fit=crop",
        name: "Erasmus Mundus Joint Masters",
        available_program: "Master's",
        location: "Europe"
    },
    {
        image: "https://www.dreamstudiesabroad.com/images/schools/arizona-state/38x8r3449u.jpg",
        name: "Fulbright Scholarship",
        available_program: "Master's",
        location: "USA"
    }
];

// -------------------- DETAILS --------------------

function openDetails(index) {

    const currentScholarships =
        JSON.parse(localStorage.getItem("currentScholarships")) || [];

    localStorage.setItem(
        "selectedScholarship",
        JSON.stringify(currentScholarships[index])
    );

    window.location.href = "details.html";
}

// -------------------- DISPLAY --------------------

function displayInfo(list) {

    const container = document.getElementById("scholarships");

    container.innerHTML = "";

    list.forEach(function (i, index) {

        container.innerHTML += `
        <div class="list-card">

            <img src="${i.image}" alt="${i.name}">

            <h2>${i.name}</h2>

            <h4>Available Programs: ${i.available_program}</h4>

            <p><strong>Location:</strong> ${i.location}</p>

            <div class="card-buttons">

                <button class="details-btn"
                    onclick="openDetails(${index})">
                    See Details
                </button>

                <button class="save-btn"
                    onclick="saveScholarship(${index})">
                    Save
                </button>

            </div>

        </div>
        `;
    });

}

// -------------------- SAVE --------------------

function saveScholarship(index) {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Please log in before saving a scholarship.");
        window.location.href = "login.html";
        return;
    }

    const scholarships =
        JSON.parse(localStorage.getItem("currentScholarships")) || [];

    const selectedScholarship = scholarships[index];

    const savedListKey =
        `savedScholarships_${currentUser.id}`;

    const savedScholarships =
        JSON.parse(localStorage.getItem(savedListKey)) || [];

    const alreadySaved = savedScholarships.some(function (item) {
        return item.name === selectedScholarship.name;
    });

    if (alreadySaved) {
        alert("Scholarship already saved.");
        return;
    }

    savedScholarships.push(selectedScholarship);

    localStorage.setItem(
        savedListKey,
        JSON.stringify(savedScholarships)
    );

    alert("Scholarship saved successfully!");

}

// -------------------- PAGINATION --------------------

function loadPage(page) {

    if (page === 1) {

        localStorage.setItem(
            "currentScholarships",
            JSON.stringify(page1)
        );

        displayInfo(page1);

    } else {

        localStorage.setItem(
            "currentScholarships",
            JSON.stringify(page2)
        );

        displayInfo(page2);

    }

}

// First page loads automatically
loadPage(1);

// -------------------- NAVIGATION --------------------

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

const navbox = document.getElementById("navbox");

if (currentUser && navbox) {

    navbox.innerHTML = `
        <a href="user_profile.html" id="login">My Profile</a>
        <a href="#" id="signup" onclick="logout()">Log Out</a>
    `;

}

// -------------------- LOGOUT --------------------

function logout() {

    localStorage.removeItem("currentUser");

    alert("Logged out successfully!");

    window.location.href = "Landingpage.html";

}