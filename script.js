document.addEventListener("DOMContentLoaded", function() {
  
  

  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  const statsContainer = document.querySelector(".stats-container");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");
  const cardStatsContainer = document.querySelector(".stats-cards");
  
  function valdidateUser () {
    alert("Validating User....");
    const username = usernameInput.value;
    if (username.trim() === "") {
      alert("Please enter a username");
      return false;
    } ;
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
      alert("Please enter a valid username");
      return false;
    }
    return true;
   

  }
  function updateProgress(solved, total, label, circle) {
    
    const progressDegree = (solved/total)*100;
   
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    label.textContent = `${solved}/${total}`;
}
  function displaydata(data) {
  
    let easy = data.easySolved;
    let medium = data.mediumSolved;
    let hard = data.hardSolved;
    let totaleasy = data.totalEasy;
    let totalmedium = data.totalMedium;
    let totalhard = data.totalHard;
    updateProgress(easy, totaleasy, easyLabel, easyProgressCircle);
    updateProgress(medium, totalmedium, mediumLabel, mediumProgressCircle);
    updateProgress(hard, totalhard, hardLabel, hardProgressCircle);

   
    
   

    easyLabel.textContent = `${easy}/${totaleasy}`;
    mediumLabel.textContent = `${medium}/${totalmedium}`;
    hardLabel.textContent = `${hard}/${totalhard}`;
    cardStatsContainer.innerHTML = `<div class="card">
    <p class="stats-card__title">Total Questions Solved</p>
    <p class="stats-card__value">${data.totalSolved}</p>
  </div>
  <div class="card">
    <p class="stats-card__title">rank is :</p>
    <p class="stats-card__value">${data.ranking}</p>
    </div>
    <div class="card">
    <p class="stats-card__title">Acceptace rate is  :</p>
    <p class="stats-card__value">${data.acceptanceRate}</p>
    </div>`;
  


    
  };
  async function fetchuserStats(){

    searchButton.disabled = true;
    searchButton.style.backgroundColor = "red";
    searchButton.innerHTML = "Fetching...";

    
   

    try{
      
      const username = usernameInput.value;
      console.log(username);
      
      
      
      
      let response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
      data = await response.json();
      
     
      displaydata(data);
      
      }
  catch(error) {
    statsContainer.innerHTML = `<p>${error.message}</p>`
}
finally {
    searchButton.textContent = "Search";
    searchButton.style.backgroundColor = "greenyellow";
    searchButton.disabled = false;
}
    
  }
  
  searchButton.addEventListener("click", function() {
   
    if(valdidateUser()) {
      fetchuserStats();
    }
  });
});



   

    
