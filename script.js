const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let board = Array(9).fill(null);

const updateBoard = () => {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
};

const handleClick = (e) => {
    const index = Array.from(cells).indexOf(e.target);

    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    updateBoard();
    updateStatus();
};

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of winPatterns) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : 'Draw';
};

const updateStatus = () => {
    const winner = checkWinner();
    if (winner) {
        if (winner === 'Draw') {
            status.textContent = "It's a draw!";
        } else {
            status.textContent = `Player ${winner} wins!`;
        }
    } else {
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const resetGame = () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    updateBoard();
    updateStatus();
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
