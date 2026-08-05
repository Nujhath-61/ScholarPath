
const adminDetails = {
    name: "Tom",
    institution: "ABCD",
    designation: "Senior Admission Officer",
    phoneNumber: "011223344"
};

const profile = document.getElementById("profile");
const scholarshipList = document.getElementById("lists2");
const scholarshipCount = document.getElementById("scholarshipCount");

function escapeHTML(text) {
    const temporaryElement = document.createElement("div");
    temporaryElement.textContent = text || "";
    return temporaryElement.innerHTML;
}

function showProfile() {
    profile.innerHTML = `
        <div class="profile-avatar">
            ${adminDetails.name.charAt(0)}
        </div>

        <div class="profile-details">
            <div class="profile-item">
                <small>Name</small>
                <strong>${escapeHTML(adminDetails.name)}</strong>
            </div>

            <div class="profile-item">
                <small>Institution</small>
                <strong>${escapeHTML(adminDetails.institution)}</strong>
            </div>

            <div class="profile-item">
                <small>Designation</small>
                <strong>${escapeHTML(adminDetails.designation)}</strong>
            </div>

            <div class="profile-item">
                <small>Phone Number</small>
                <strong>${escapeHTML(adminDetails.phoneNumber)}</strong>
            </div>
        </div>
    `;
}

function getScholarships() {
    return JSON.parse(localStorage.getItem("list")) || [];
}

function displayScholarships() {
    const scholarships = getScholarships();

    scholarshipCount.textContent =
        `${scholarships.length} scholarship${scholarships.length === 1 ? "" : "s"}`;

    if (scholarships.length === 0) {
        scholarshipList.innerHTML = `
            <div class="empty-state">
                <h3>No scholarships posted yet</h3>
                <p>Click “Add Scholarship” to publish your first opportunity.</p>
            </div>
        `;
        return;
    }

    scholarshipList.innerHTML = scholarships.map((scholarship, index) => {
        const title = escapeHTML(scholarship.title);
        const location = escapeHTML(scholarship.location);
        const deadline = escapeHTML(scholarship.deadline);
        const description = escapeHTML(scholarship.description);
        const link = scholarship.link || "";

        const website = link
            ? `<a class="website-link" href="${escapeHTML(link)}" target="_blank" rel="noopener">
                Visit scholarship website →
               </a>`
            : "";

        return `
            <article class="scholarship-card">
                <div class="card-content">
                    <h3>${title}</h3>

                    <div class="card-meta">
                        <span class="meta-tag">📍 ${location || "Location not added"}</span>
                        <span class="meta-tag">📅 Deadline: ${deadline || "Not added"}</span>
                    </div>

                    <p class="card-description">
                        ${description || "No description added for this scholarship."}
                    </p>

                    ${website}
                </div>

                <div class="card-actions">
                    <button class="action-button edit-button" onclick="editScholarship(${index})">
                        Edit
                    </button>

                    <button class="action-button delete-button" onclick="deleteScholarship(${index})">
                        Delete
                    </button>
                </div>
            </article>
        `;
    }).join("");
}

function deleteScholarship(index) {
    const scholarships = getScholarships();
    const scholarshipName = scholarships[index].title || "this scholarship";

    const confirmed = confirm(`Are you sure you want to delete "${scholarshipName}"?`);

    if (!confirmed) {
        return;
    }

    scholarships.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(scholarships));
    displayScholarships();
}
function editScholarship(index) {
    window.location.href = `edit_form.html?index=${index}`;
}
showProfile();
displayScholarships();

window.addEventListener("storage", (event) => {
    if (event.key === "list") {
        displayScholarships();
    }
});




































































/*const details1 = [
    {
        "name":"Tom",
        "institution":"ABCD",
        "designation":"senior admission officer",
        "phone_number":"011223344"
    }
]

const lists = JSON.parse(localStorage.getItem("list")) || [];

scholarship_details2(lists);
profile_details(details1);
const add = document.getElementById("add");
add.innerHTML += `
<div >

<a id="addBtn" href="add.html"> <img src="Icons/plus.png" alt="" height="12" width="12">Add a scholarship </a> <br>
 </div>

`
const posted = document.getElementById("posted");
posted.innerHTML = "Posted";

function profile_details(list){
    const profile = document.getElementById("profile");

profile.innerHTML ="";

    list.forEach(element => {
        profile.innerHTML += `
        <div id="profile_img">
            <img src="https://e7.pngegg.com/pngimages/563/269/png-clipart-tom-cat-tom-and-jerry-cat-mammal-animals-thumbnail.png" width="100" height="100"alt="">
        </div>
     <div id="profile-info">
     <div class = "title">
     <p class="title_info">Name:</p>
       <p class="title_info">Institution:</p>
         <p class="title_info">Designation:</p>
           <p class="title_info">Phone-number:</p>
     
       </div>
 <div class="value">
                    <p class="info">${element.name}</p>
                    <p class="info">${element.institution}</p>
                    <p class="info">${element.designation}</p>
                    <p class="info">${element.phone_number}</p>
                </div>
            
        </div> `;
    });
}
// Listen for changes made in other tabs/pages
window.addEventListener('storage', (event) => {
    // Check if the change happened to your specific list key
    if (event.key === 'list') { 
        console.log('Local storage updated from another page!');
        
        // 1. Re-load the updated data from localStorage
        savedItems = JSON.parse(event.newValue) || []; 
        
        // 2. Call your existing display function to refresh the UI
        displayList(); 
    }
});


function scholarship_details2(info) {

    const lists2 = document.getElementById("lists2");

    lists2.innerHTML = "";

    if (info.length === 0) {
        lists2.innerHTML = "<p>No scholarships posted yet.</p>";
        return;
    }

    info.forEach((element, index) => {
        lists2.innerHTML += `
            <div class="scholarship-card">
                <div class="card-info">

                    <div class="card_title">
                        <h2>${element.title}</h2>
                        <h3>${element.location}</h3>
                        <p>Deadline:${element.deadline}</p>
                        <p>${element.description}</p>
                       <p>Website link:${element.link}</p>

                        <div class="list_button">
                            <button class="btn" onclick="editScholarship(${index})">
                                Edit
                            </button>

                            <button class="btn" onclick="deleteScholarship(${index})">
                                Delete
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        `;
      
    });
    
}

function deleteScholarship(index){
    const listItems = JSON.parse(localStorage.getItem('list')) || [];
    listItems.splice(index, 1);    
   
    localStorage.setItem('list', JSON.stringify(listItems));
     if (listItems.length === 0) {
        lists2.innerHTML = "<p>No scholarships posted yet.</p>";
        return;
    }
    
    scholarship_details2(listItems);
}


/*const details1 = [
    {
        "name":"Tom",
        "institution":"ABCD",
        "designation":"senior admission officer",
        "phone_number":"011223344"
    }
]
const info  = [
    {
         "image":"https://images.unsplash.com/photo-1621519604512-85ea63c15ca2?q=80&w=779&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "name": "Erasmus Mundus Joint Masters",
    "available_program": "Master's",
    "location": "Europe"
    },
  {
     "image":"https://media.studentcrowd.net/w1200/index-data/20240110143013-campus-hammersmith-1-tojpeg-1417716218508-x4.jpg",
     "name": "Commonwealth Scholarship",
    "available_program": "Master's , PhD",
    "location": "UK"
    
  }
]
 
scholarship_details(info);

function profile_details(list){
    const profile = document.getElementById("profile");

profile.innerHTML ="";

    list.forEach(element => {
        profile.innerHTML += `
        <div id="profile_img">
            <img src="https://e7.pngegg.com/pngimages/563/269/png-clipart-tom-cat-tom-and-jerry-cat-mammal-animals-thumbnail.png" width="100" height="100"alt="">
        </div>
     <div id="profile-info">
     <div class = "title">
     <p class="title_info">Name:</p>
       <p class="title_info">Institution:</p>
         <p class="title_info">Designation:</p>
           <p class="title_info">Phone-number:</p>
     
       </div>
 <div class="value">
                    <p class="info">${element.name}</p>
                    <p class="info">${element.institution}</p>
                    <p class="info">${element.designation}</p>
                    <p class="info">${element.phone_number}</p>
                </div>
            
        </div> `;
    });
}
const add = document.getElementById("add");
add.innerHTML += `
<div >

<a id="addBtn" href="add.html"> <img src="Icons/plus.png" alt="" height="12" width="12">Add a scholarship </a> <br>
 </div>

`
const posted = document.getElementById("posted");
posted.innerHTML = "Posted";
function add_scholarship(){

}
function scholarship_details(info) {

    const lists = document.getElementById("lists");

    lists.innerHTML = "";

    if(info.length === 0){
        lists.innerHTML = "<p>No scholarships posted yet.</p>";
        return;
    }

    info.forEach((element,index)=>{

        lists.innerHTML += `
      
       
        <div class="scholarship-card">
        <div class="card-info">
        <div> 
        <img src=${element.image} alt="" >
        </div>
           
      <div class="card_title"> 
         <h2>${element.name}</h2>

            <h3>${element.available_program}</h3>
              <div class="list_button">

                <button class="btn" onclick="editScholarship(${index})">
                    Edit
                </button>

                  <button class="btn" onclick="viewScholarship(${index})">
                    Details
                </button>
                <button class="btn" onclick="deleteScholarship(${index})">
                    Delete
                </button>

            </div>
          

        </div>
           
          
        
        </div>
      

          

        </div>
       

        `;

    });

}

*/
