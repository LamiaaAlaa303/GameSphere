var playSpace = document.getElementById('playSpace');
var gameScoreElem = document.getElementById('score');
var gameHighScoreElem = document.getElementById('highScore');
var foodX, foodY;
var snakeX = 7, snakeY = 14;
var speedX = 0, speedY = 0;
var snakeBody = [];
// var snakeBody = [[snakeX, snakeY]]; 
// snakeBody[0] = [snakeX, snakeY];
var gameOver = false;
var score = 0;
var highScore = localStorage.getItem("highScore");// get highScore from localStorage
gameHighScoreElem.innerText = `High Score: ${highScore}`;

function gameOverHandel(){
    clearInterval(startGameInterval);
    alert("Game Over! Press Ok to replay..");
    location.reload();
}

function startGame(){
    if(gameOver){
        return gameOverHandel();
    }
    var food = `<div id="food" style="grid-area: ${foodY}/${foodX}"></div>`;
    // snake eats food
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPos();
        snakeBody.push([foodX, foodY]) // add foodPos to sankeBody
        console.log(snakeBody);
        score++;
        if(score >= highScore){
            highScore = score;
        }
        
        localStorage.setItem("highScore", highScore);
        gameScoreElem.innerText = `Score: ${score}`;
        gameHighScoreElem.innerText = `High Score: ${highScore}`;
    }

    // shift forward the values of snakeBody => snakeBody increase shape
    for(var i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    // the first element is the current sankePos
    snakeBody[0] = [snakeX, snakeY];

    snakeX += speedX;
    snakeY += speedY;

    // snakePos is in the border of playSpace
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    for(var i = 0; i < snakeBody.length; i++){
        // food += `<div class="snake" style="grid-area: ${snakeY}/${snakeY}"></div>`;
        food += `<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        // snake eats its body
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    playSpace.innerHTML = food;
}

//  set a random value from 0 to 30(size of grid) for foodX and foodY
function changeFoodPos(){
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// change speedX and speedY based on key you press
function changeSnakeDir(e){
    console.log(e);
    if(e.key === "ArrowDown" && speedY != -1){ // && sppedY !=-1 => to not return opsite
        speedX = 0;
        speedY = 1;
    }
    else if(e.key === "ArrowUp" && speedY != 1){
        speedX = 0;
        speedY = -1;
    }
    else if(e.key === "ArrowRight" && speedX != -1){
        speedX = 1;
        speedY = 0;
    }
    else if(e.key === "ArrowLeft" && speedX != 1){
        speedX = -1;
        speedY = 0;
    }
}
// 1) change the foodPos in the begaining of the game randomly
changeFoodPos();
var startGameInterval = setInterval(startGame, 150);
// 
document.addEventListener("keydown", changeSnakeDir);
