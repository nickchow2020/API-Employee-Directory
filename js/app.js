/**********************Gobal Variable That: */
//Used in this project
/****************** */
const randomUsersAPI = "https://randomuser.me/api/?results=12";
const gridsContainer = document.querySelector(".grid-container");
const overlaysContainer = document.querySelector(".overlayWrap");
const filterInput = document.querySelector(".filter")
const overlayDiv = document.querySelectorAll(".overlay")

/**********************Async Function That: */
// Getting Data From API With 12 random Users and Structure Them
/****************** */
function structureData (data){
   const dataNeeds = data.map((info => {
       const firstName = info.name.first;
       const lastName = info.name.last;
       const email = info.email;
       const city = info.location.city;
       const avatarURL = info.picture.large;
       const phone = info.phone;
       const addressUnit = info.location.street.number;
       const addressStreet = info.location.street.name;
       const addressZip = info.location.postcode;
       const addressCountry = info.location.country;
       const addressState = info.location.state;
       const birthday = info.dob.date;
       const datas = {
           name : `${firstName} ${lastName}`,
           email,
           city,
           avatarURL,
           phone,
           birthday:`${birthday.substring(5,7)}/${birthday.substring(8,10)}/${birthday.substring(2,4)}`,
           address: `${addressUnit} ${addressStreet} ${addressState} ${addressZip} ${addressCountry}`,
       }
       return datas;
   }))
   return dataNeeds;
}

/**********************Async Function That: */
// Getting Data From API With 12 random Users
/****************** */
async function randomUsers(url){
    const randomUsers = await fetch(url);
    const usersToJson = await randomUsers.json();
    const userData = usersToJson.results.map(data =>{
        const user = data
        return user;
    });
    return userData;
}

/**********************Function That: */
// Going to Structure the HTML Data
/****************** */
function structureHTML(data){
    const usersHTML = data.map(data => {
        const gridItem = document.createElement("SECTION");
        gridItem.classList.add("grid-item");
        gridsContainer.appendChild(gridItem);
        gridItem.innerHTML = `
        <div class="card">
          <img src="${data.avatarURL}" alt="${data.name}" class="avatar">
          <div>
            <h2 class="name">${data.name}</h2>
            <p class="email">${data.email}</p>
            <p class="city">${data.city}</p>
          </div>
        </div>
      <div class="overlay">
        <p class="previous"><</p>
        <div class="modal">
          <p class="close">X</p>
          <div>
            <img src="${data.avatarURL}" alt="${data.name}" class="avatar">
            <h2 class="nameoverlay">${data.name}</h2>
            <p class="email">${data.email}</p>
            <p class="city">${data.city}</p>
            <hr class="line">
            <p class="phone">${data.phone}</p>
            <p class="address">${data.address}</p>
            <p class="birthday">BirthDay:${data.birthday}</p>
          </div>
        </div>
        <p class="next">></p>
      </div>
        `
        return gridItem;
    })
    return usersHTML;
}


function structureFilterHTML(data){
  gridsContainer.innerHTML = "";
  const usersHTML = data.map(data => {
    const gridItem = document.createElement("SECTION");
    gridItem.classList.add("grid-item");
    gridsContainer.appendChild(gridItem);
    gridItem.innerHTML = `
    <div class="card">
      <img src="${data.avatarURL}" alt="${data.name}" class="avatar">
      <div>
        <h2 class="name">${data.name}</h2>
        <p class="email">${data.email}</p>
        <p class="city">${data.city}</p>
      </div>
    </div>
    <div class="overlay">
    <p class="previous"><</p>
    <div class="modal">
      <p class="close">X</p>
      <div>
        <img src="${data.avatarURL}" alt="${data.name}" class="avatar">
        <h2 class="nameoverlay">${data.name}</h2>
        <p class="email">${data.email}</p>
        <p class="city">${data.city}</p>
        <hr class="line">
        <p class="phone">${data.phone}</p>
        <p class="address">${data.address}</p>
        <p class="birthday">BirthDay:${data.birthday}</p>
      </div>
    </div>
    <p class="next">></p>
  </div>
    `
    return gridItem;
})
return usersHTML;
}
/**********************Function Call: */
// Structure the Overlay HTML Data,
// Structure the HTML Data,
/****************** */
randomUsers(randomUsersAPI)
 .then(structureData)
 .then(data => {
    structureHTML(data)


 /***************Event Handler keyup That: */
 //making the filter by employee name 
  filterInput.addEventListener("keyup",(e)=>{
    const filterValue = filterInput.value.toLowerCase();
    if(filterValue !== ""){
      let filterData = [];
      for(let i = 0; i < data.length; i ++){
        if(data[i].name.toLowerCase().indexOf(filterValue) > -1){
          filterData.push(data[i])
        }
     }
     structureFilterHTML(filterData);
    }else{
      structureFilterHTML(data)
    }
  })

/***************Event Handler click That: */
  //making modal window pop up and close
  //also able to interactive with previsou and next arrow
  gridsContainer.addEventListener("click",(e)=>{

   //making modal window close
   if(e.target.classList.contains("close")){
     const overlay = e.target.parentNode.parentNode;
     overlay.style.visibility = "hidden";
   }

   //making the overlay window pop up
   if(e.target.tagName === "DIV" || e.target.tagName === "IMG" || e.target.tagName === "H2" || e.target.tagName === "P"){
     const target = e.target;

     if(target.classList.contains("card")){
      target.nextElementSibling.style.visibility = "visible";
     }
     
      const cardImg = target.closest(".card");
      if(cardImg){
        cardImg.nextElementSibling.style.visibility = "visible";
      }
    }

    // making the privous Arrow clickable
    if(e.target.classList.contains("previous")){
      const target = e.target;
      const targetParent = target.parentNode;
      const targetSection = targetParent.parentNode;
      const previousSection = targetSection.previousElementSibling;
      if(previousSection){
        const previousOverlay = previousSection.children[1];
        targetParent.style.visibility = "hidden";
        previousOverlay.style.visibility = "visible";
      }
    }

    //making the next Arrow clickable
    if(e.target.classList.contains("next")){
      const target = e.target;
      const targetParent = target.parentNode;
      const targetSection = targetParent.parentNode;
      const nextSection = targetSection.nextElementSibling;

      if(nextSection){
        const nextOverlay = nextSection.children[1];
        targetParent.style.visibility = "hidden";
        nextOverlay.style.visibility = "visible";
      }
    }

  })
  
 })
  .catch(err => console.log("There Was a Error occur,Please check your code",err))



/****************** */