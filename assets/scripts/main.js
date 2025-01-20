document.getElementById("toggle").onclick = () => {
  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    document.getElementById("toggle").src = "assets/icons/moon.png";
  } else {
    document.body.classList.add("dark-theme");
    document.getElementById("toggle").src = "assets/icons/sun.png";
  }
};

let searchUser = document.getElementById("search-user");
let searchBtn = document.getElementById("search-btn");
let userDetails = document.getElementById("user-details");


searchBtn.onclick = () =>{
  getData();
}
function getData(){
  let message = document.getElementById("message");
    if(searchUser.value == ""){
        message.innerHTML = "Enter a Valid Username";
        message.style.color = "rgb(255, 0, 0)";
    }else{
  fetch(`https://api.github.com/users/${searchUser.value}`)
    .then((res) => res.json())
    .then((userData) => {
      data = `
  <div class= "user-data">
  <div class = " user-image name">
  <img src= "${userData.avatar_url}" alt= "User" />
  <h1>${userData.name}</h1>
  </div>
  <div class = "user-info></div>
  <div class = "username">
  </div>
  <a class ="profile" href="${userData.html_url }" target= "_blank">GitHub Progile</a>
  </div>
  </div>
  <div class="profile-details">
  <span class="repositories">Repositories ${userData.public_repos}</span>
  </div>
<div class="repos-data">
<ul id="repos-data">
</ul>
</div>
`
fetch(`https://api.github.com/users/${searchUser.value}/repos`)
.then(res=>res.json())
.then((reposData)=>{
    let reposOutput = "";
    for(let i = 0 ; i<reposData.length ; i++ ){
        reposOutput += `
        <li><a href="${reposData[i].homepage}" target="_blank">
        <span class="page-name">${reposData[i].name}</span></a></li>
        `
        document.getElementById("repos-data").innerHTML=reposOutput;
    }
})
    
userDetails.innerHTML = data;
    });
  }
}
