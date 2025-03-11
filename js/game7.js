
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let isGameOver = false;

const backgroundMusic = document.getElementById('backgroundMusic');
window.onload = function() {
    backgroundMusic.play();
    initGame();
};

function initGame() {
    const boardElement = document.getElementById('gameBoard');
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => makeMove(i));
        boardElement.appendChild(cell);
    }
}

function makeMove(index) {
    if (isGameOver || gameBoard[index]) return;

    gameBoard[index] = currentPlayer;
    const cell = document.getElementsByClassName('cell')[index];
    cell.innerText = currentPlayer;

    if (checkWin()) {
        document.getElementById('status').innerText = `Player ${currentPlayer} wins!`;
        isGameOver = true;
        playWinSound();
    } else if (gameBoard.every(cell => cell)) {
        document.getElementById('status').innerText = `It's a tie!`;
        isGameOver = true;
        playLoseSound();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function playWinSound() {
    const audio = new Audio('../images/272182672-female-voice-good-job.m4a');
    audio.play();
}

function playLoseSound() {
    const audio = new Audio('../images/240728250-sfx-fanfare-music-lose-2.m4a');
    audio.play();
}
