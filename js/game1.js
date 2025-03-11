
var errors = 0;
var cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
];

var cardSet;
var board = [];
var rows = 4;
var columns = 5;
var matches = 0; 
var totalMatches = cardList.length; 
var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList);
    console.log(cardSet);
   
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); 
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
  
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); 

            // <img id="0-0" class="card" src="images/water.jpg">
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "../images/" + cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }

    console.log(board);
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "../images/back.jpg";
        }
    }
}

function selectCard() {
    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = "../images/" + board[r][c] + ".jpg";
        } else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); 
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = "../images/" + board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    let correctSound = document.getElementById("correctSound");
    let wrongSound = document.getElementById("wrongSound");

 
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "../images/back.jpg";
        card2Selected.src = "../images/back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
        wrongSound.play();
    } else {
        matches += 1;
        correctSound.play();

       
        if (matches === totalMatches) {
            startCelebration();
        }
    }

    card1Selected = null;
    card2Selected = null;
}

function startCelebration() {
    let celebration = document.getElementById("celebration");

    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
        confetti.style.setProperty('--random-x', (Math.random() * 2 - 1) * 10 + 'vw');
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'; 
        celebration.appendChild(confetti);
    }

    setTimeout(() => {
        celebration.innerHTML = ""; 
    }, 6000);
}

