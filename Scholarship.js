
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
     "image":"https://www.seagull-tandem.eu/wp-content/uploads/2013/08/Halle-1024x597.jpg",
     "name": "Fulbright Scholarship",
    "available_program": "Master's",
    "location": "USA"
    
  }
];

function displayJobs(list){

    const container=document.getElementById("scholarships");

    container.innerHTML="";

  list.forEach(i=>{

        container.innerHTML+=`
        <div class="list-card">
            <img src= ${i.image} alt="" >
            <h2>${i.name}</h2>
            <h4> Available Programs: ${i.available_program}</h4>

            <p><strong>Location:</strong> ${i.location}</p>

            <br>

            <button class="details-btn">See Details</button>

           

        </div>
        `;

    });

}

function loadPage(page){

    if(page===1){
        displayJobs(page1);
    }
    else{
        displayJobs(page2);
    }

}

loadPage(1);
