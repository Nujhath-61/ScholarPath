const formInfo = document.getElementById("formInfo");

formInfo.addEventListener("submit", function (event) {
   
    const title = document.getElementById("title").value;
    const location = document.getElementById("location").value;
    const deadline = document.getElementById("deadline").value;
    const link = document.getElementById("link").value;
    const type = document.getElementById("type").value;
    const hour = document.getElementById("hour").value;
    
    const description = document.getElementById("description").value;

    const scholarship = {
        title,
        location,
        deadline,
        link,
        type,
        hour,
        description
    };

       const lists = JSON.parse(localStorage.getItem("list")) || [];

        lists.push(scholarship);
    localStorage.setItem("list", JSON.stringify(lists));

    console.log("Scholarship saved!");

});