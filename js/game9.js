
var board;
var boardWidth = 360;
var boardHeight = 640;
var context;
var birdWidth = 34;
var birdHeight = 24;
var birdX = boardWidth / 8;
var birdY = boardHeight / 2;
var birdImg;
var bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};
var pipeArray = [];
var pipeWidth = 64;
var pipeHeight = 512;
var pipeX = boardWidth;
var pipeY = 0;
var topPipeImg;
var bottomPipeImg;
var velocityX = -2;
var velocityY = 0;
var gravity = 0.4;
var gameOver = false;
var score = 0;

var gameOverSound = document.getElementById("gameOverSound");

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    birdImg = new Image();
    birdImg.src = "../images/flappybird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    topPipeImg = new Image();
    topPipeImg.src = "../images/toppipe.png";
    bottomPipeImg = new Image();
    bottomPipeImg.src = "../images/bottompipe.png";

    document.getElementById("startButton").addEventListener("click", startGame);

    function startGame() {
        requestAnimationFrame(update);
        setInterval(placePipes, 1500);
        document.addEventListener("keydown", moveBird);
        document.getElementById("startButton").style.display = "none"; 
    }
};

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
        gameOverSound.play(); 
    }

    for (var i = 0; i < pipeArray.length; i++) {
        var pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
            gameOverSound.play(); 
        }
    }

    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);
    
    if (gameOver) {
        context.fillText("GAME OVER", 5, 90);
    }
}

function placePipes() {
    if (gameOver) {
        return;
    }
    
    var randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    var openingSpace = board.height / 4;
    
    var topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };

    pipeArray.push(topPipe);
    
    var bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };

    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        velocityY = -6;

        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}
