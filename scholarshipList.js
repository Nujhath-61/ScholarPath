const page1 = [
  {
    "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQApMxK-CUTD5mNAPacjbr5LKNrxCmA_5Nj1vf4O0v9YA&s=10",
   "name": "Knight-Hennessy scholars",
    "available_program": "MA, MBA, MD, MS, PhD",
    "location": "Stanford, California 94305."
    
    
  },
  {
     "image":"https://media.studentcrowd.net/w1200/index-data/20240110143013-campus-hammersmith-1-tojpeg-1417716218508-x4.jpg",
     "name": "Commonwealth Scholarship",
    "available_program": "Master's , PhD",
    "location": "UK"
    
  },
    {
     "image":"https://www.utm.my/about/wp-content/uploads/sites/554/2025/10/MGM8264-1280x853.jpg",
     "name": "Malaysia International Scholarship (MIS)",
    "available_program": "Master's , PhD",
    "location": "Malyasia"
    
  }
];

const page2 = [
  {
    "image":"https://images.unsplash.com/photo-1621519604512-85ea63c15ca2?q=80&w=779&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "name": "Erasmus Mundus Joint Masters",
    "available_program": "Master's",
    "location": "Europe"
    
    
  },
  {
    image: "https://picsum.photos/400/220?random=10",
    name: "Fulbright Scholarship",
    available_program: "Master's",
    location: "USA"
}
];
function openDetails(index) {
    const currentScholarships = JSON.parse(
        localStorage.getItem("currentScholarships")
    ) || [];

    localStorage.setItem(
        "selectedScholarship",
        JSON.stringify(currentScholarships[index])
    );

    window.location.href = "details.html";
}
function displayInfo(list) {
    const container = document.getElementById("scholarships");

    container.innerHTML = "";

    list.forEach((i, index) => {
        container.innerHTML += `
            <div class="list-card">
                <img src="${i.image}" alt="${i.name}">

                <h2>${i.name}</h2>
                <h4>Available Programs: ${i.available_program}</h4>
                <p><strong>Location:</strong> ${i.location}</p>

                <br>

                <div class="card-buttons">
    <button class="details-btn" onclick="openDetails(${index})">
        See Details
    </button>

    <button class="save-btn" onclick="saveScholarship(${index})">
        Save
    </button>
</div>
            </div>
        `;
    });
}
function saveScholarship(index) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Please sign up or log in before saving a scholarship.");
        window.location.href = "register_2.html";
        return;
    }

    const scholarships = JSON.parse(
        localStorage.getItem("currentScholarships")
    ) || [];

    const selectedScholarship = scholarships[index];

    const savedListKey = `savedScholarships_${currentUser.id}`;

    const savedScholarships = JSON.parse(
        localStorage.getItem(savedListKey)
    ) || [];

    const alreadySaved = savedScholarships.some(function (item) {
        return item.name === selectedScholarship.name;
    });

    if (alreadySaved) {
        alert("This scholarship is already in your saved list.");
        return;
    }

    savedScholarships.push(selectedScholarship);

    localStorage.setItem(
        savedListKey,
        JSON.stringify(savedScholarships)
    );

    alert("Scholarship saved successfully!");
}
function loadPage(page){

    if(page===1){
      localStorage.setItem("currentScholarships", JSON.stringify(page1));
        displayInfo(page1);
    }
    else{
      localStorage.setItem("currentScholarships", JSON.stringify(page2));
        displayInfo(page2);
    }

}

loadPage(1);