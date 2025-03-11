
var currentMoleTile;
var currentPlantTile;
var score = 0;
var gameOver = false;

window.onload = function () {
    setGame();
}

function setGame() {
    //set up the grid for the game board in html
    for (var i = 0; i < 9; i++) {
        var tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener('click', selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

function getRandomTile() {
    var num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currentMoleTile) {
        currentMoleTile.innerHTML = "";
    }
    var mole = document.createElement('img');
    mole.src = "../images/monty-mole.png";
    var num = getRandomTile();
    if (currentPlantTile && currentPlantTile.id == num) {
        return;
    }
    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currentPlantTile) {
        currentPlantTile.innerHTML = "";
    }
    var plant = document.createElement('img');
    plant.src = "../images/piranha-plant.png";
    var num = getRandomTile();
    if (currentMoleTile && currentMoleTile.id == num) {
        return;
    }
    currentPlantTile = document.getElementById(num);
    currentPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currentMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    } else if (this == currentPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
        playGameOverSound();
    }
}

function playGameOverSound() {
    var audio = new Audio('../images/240728250-sfx-fanfare-music-lose-2.m4a');
    audio.play();
}
