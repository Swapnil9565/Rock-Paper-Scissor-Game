let choiceConHide = document.querySelector(".hide-choiceCon");
let playBtn = document.getElementById("play-btn");
let resultCon = document.querySelector(".result-container");
let resultHide = document.querySelector(".hide-result");

let ruleCon = document.querySelector(".hide-ruleCon");
let ruleBtn = document.getElementById("rule-btn");
let crossBtn = document.getElementById("cross-btn");
let HideNextBtn = document.querySelector(".hide-nextBtn");
let statusbar = document.getElementById("status");
let hideResultbox = document.querySelector(".result-box");

let mainElement = document.querySelector(".main");

let savedCompsScore = localStorage.getItem('compsScore');
let savedUsersScore = localStorage.getItem('usersScore');

let comps = document.getElementById('comp-score');
let users = document.getElementById('user-score');
comps.textContent = savedCompsScore !== null ? savedCompsScore : 0;
users.textContent = savedUsersScore !== null ? savedUsersScore : 0;


function toggleRuleContainer() {
  ruleCon.classList.toggle("hide-ruleCon");
}
function hideRuleCon() {
  ruleCon.classList.toggle("hide-ruleCon");
}
ruleBtn.addEventListener("click", () => {
  toggleRuleContainer();
});
crossBtn.addEventListener("click", () => {
  hideRuleCon();
});

let buttons = document.querySelectorAll(".icon");
buttons.forEach((button) => {
  button.addEventListener("click", playGame);
  button.addEventListener("click", function () {
    let backgroundValue = getComputedStyle(button).getPropertyValue("background-image");
    let borderColor = getComputedStyle(button).getPropertyValue("border-color");
    
    mainElement.style.backgroundImage = backgroundValue;
    mainElement.style.borderColor = borderColor;
    choiceConHide.style.display = "none"; 
    hideResultbox.style.display = "flex"; 
    resultHide.style.display = "block";
    HideNextBtn.style.display = "block";
  });
});

function playGame(e) {
  let choices = ["rock", "paper", "scissors"];
  let yourChoice = e.target.id;
  let compChoice = choices[Math.floor(Math.random() * 3)];
  let winner = getWinner(yourChoice, compChoice);
  
  let compPick = document.querySelector(".comp-pick"); 
  let yourPick = document.querySelector(".your-pick");

  statusbar.textContent = `${winner} `;

  let mainTwoElement = document.querySelector(".two");

  switch (compChoice) {
    case 'rock':
      mainTwoElement.style.backgroundImage ='url("/Icons/rock.png")'; 
      mainTwoElement.style.borderColor = '#FFA943'; 
      break;
  case 'paper':
      mainTwoElement.style.backgroundImage ='url("/Icons/paper.png")'; 
      mainTwoElement.style.borderColor = '#0074B6'; 
      break;
  case 'scissors':
      mainTwoElement.style.backgroundImage = 'url("/Icons/scissor.png")';
      mainTwoElement.style.borderColor = '#BD00FF';
      break;
  default:
      break;
  }
  playBtn.addEventListener("click", () => {
    toggleAnimation();
    function toggleAnimation() {
      console.log("toggled");
      compPick.classList.remove("animate");
      yourPick.classList.remove("animate");
    }
    choiceConHide.style.display = "block";
    resultCon.style.display = "none";
  
  });
  if (winner === "YOU WIN") {
    users.textContent = parseInt(users.textContent) + 1;
 
    localStorage.setItem("usersScore", users.textContent);
    console.log(`${parseInt(users.textContent)}`);
   
    toggleAnimation();
    function toggleAnimation() {
      console.log("toggled");
      yourPick.classList.toggle("animate");
    }
  } else if (winner === "YOU LOST") {
    comps.textContent = parseInt(comps.textContent) + 1;
  
    localStorage.setItem("compsScore", comps.textContent);
    toggleAnimation();
    function toggleAnimation() {
      console.log("toggled");
      compPick.classList.toggle("animate");
    }
  } else {
    yourPick.classList.toggle("animate");
    compPick.classList.toggle("animate");
  }
}

function getWinner(player,computer) {
  if (player === computer) {
    return "TIE UP";
  } else if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "YOU WIN";
  } else {
    return "YOU LOST";
  }
}

document.addEventListener("DOMContentLoaded", function () {
 let compPick=document.querySelector(".comp-pick")

  function toggleAnimation() {
     console.log("toggled");
      compPick.classList.toggle("animate");
  }

  compPick.addEventListener("click", toggleAnimation);
});

let nextBtn=document.getElementById("next-btn");
nextBtn.addEventListener("click",()=>{
  localStorage.clear();
})
