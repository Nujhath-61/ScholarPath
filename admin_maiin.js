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

    



