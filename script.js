const board = document.getElementById('board');
const message = document.querySelector('.message');
const resultScreen = document.querySelector('.result-screen');
const resultMessage = document.querySelector('.result-message');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    renderBoard();
    checkWinner();

    if (!gameActive) {
        resultMessage.textContent = `${currentPlayer} wins!`;
        resultScreen.style.display = 'flex';
    } else if (!gameBoard.includes('')) {
        resultMessage.textContent = "It's a draw!";
        resultScreen.style.display = 'flex';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            gameActive = false;
            return;
        }
    }
}

function startNewGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    resultScreen.style.display = 'none';
    renderBoard();
    message.textContent = `${currentPlayer}'s turn`;
}

renderBoard();
message.textContent = `${currentPlayer}'s turn`;
