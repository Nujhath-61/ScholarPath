const details1 = [
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
profile_details(details1);
scholarship_details(info);
function profile_details(list){
    const profile = document.getElementById("profile");

profile.innerHTML ="";

    list.forEach(element => {
        profile.innerHTML += `
        <div id="profile_img">
            <img src="https://drawinghowtos.com/wp-content/uploads/2025/04/The-smiling-Tom-colored.jpg" width="100" height="100"alt="">
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
const button = document.getElementById("btn");
button.innerHTML += `
<div >

<button id="addBtn" > <img src="Icons/plus.png" alt="" height="12" width="12">Add a scholarship </buttton> <br>
 </div>

`
const posted = document.getElementById("posted");
posted.innerHTML = "Posted";
function add_scholarship(){

}
function scholarship_details(info) {
    const lists = document.getElementById("lists");
    
    // Clear previous content
    lists.innerHTML = "";

    // If no data
    if (info.length === 0) {
        lists.innerHTML = "<p>No data available.</p>";
        return;
    }

    // Display data
    info.forEach(element => {
        lists.innerHTML += `
            <div class="list">
                <h3>${element.name}</h3>
                <p>${element.available_program}</p>
            </div>
             <div class="list_button">
                <button class="btn">Edit</buttton>
                 <button  class="btn">Details</buttton>
          <button  class="btn">Delete</buttton>
            </div>
            <hr>

        `;
    });

    
}


