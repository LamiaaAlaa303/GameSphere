

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const backgroundMusic = document.getElementById('backgroundMusic');

let player = { x: canvas.width / 2, y: canvas.height - 30, width: 50, height: 50, speed: 5 };
let fallingObjects = [];
let gameInterval;
let isGameRunning = false;

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', handleKeydown);

function startGame() {
    if (isGameRunning) return;
    isGameRunning = true;
    backgroundMusic.play();
    gameInterval = setInterval(updateGame, 20);
}

function handleKeydown(event) {
    if (event.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    spawnFallingObjects();
    updateFallingObjects();
    checkCollisions();
}

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function spawnFallingObjects() {
    if (Math.random() < 0.02) {
        let x = Math.random() * (canvas.width - 30);
        fallingObjects.push({ x: x, y: 0, width: 30, height: 30, speed: 3 });
    }
}

function updateFallingObjects() {
    for (let i = 0; i < fallingObjects.length; i++) {
        fallingObjects[i].y += fallingObjects[i].speed;
        ctx.fillStyle = 'red';
        ctx.fillRect(fallingObjects[i].x, fallingObjects[i].y, fallingObjects[i].width, fallingObjects[i].height);
    }
    fallingObjects = fallingObjects.filter(obj => obj.y < canvas.height);
}

function checkCollisions() {
    for (let i = 0; i < fallingObjects.length; i++) {
        if (fallingObjects[i].x < player.x + player.width &&
            fallingObjects[i].x + fallingObjects[i].width > player.x &&
            fallingObjects[i].y < player.y + player.height &&
            fallingObjects[i].y + fallingObjects[i].height > player.y) {
            endGame();
        }
    }
}

function endGame() {
    clearInterval(gameInterval);
    backgroundMusic.pause();
    isGameRunning = false;
    alert('Game Over!');
}
