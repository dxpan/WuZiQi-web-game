document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');
    const size = 19;
    let board = Array(size).fill(null).map(() => Array(size).fill(null));
    let currentPlayer = 'black';
    let gameOver = false;

    function createBoard() {
        boardElement.innerHTML = '';
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.addEventListener('click', handleCellClick);
                boardElement.appendChild(cell);
            }
        }
    }

    function handleCellClick(event) {
        if (gameOver) return;

        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);

        if (board[row][col]) {
            return; // Cell is already occupied
        }

        board[row][col] = currentPlayer;
        drawStone(row, col, currentPlayer);

        if (checkWin(row, col)) {
            gameOver = true;
            statusElement.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`;
        } else if (isBoardFull()) {
            gameOver = true;
            statusElement.textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
            statusElement.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s Turn`;
        }
    }

    function drawStone(row, col, player) {
        const stone = document.createElement('div');
        stone.classList.add('stone', player);
        const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
        cell.appendChild(stone);
    }

    function checkWin(row, col) {
        const directions = [
            { r: 0, c: 1 },  // Horizontal
            { r: 1, c: 0 },  // Vertical
            { r: 1, c: 1 },  // Diagonal \
            { r: 1, c: -1 }  // Diagonal /
        ];

        for (const dir of directions) {
            let count = 1;
            // Check in the positive direction
            for (let i = 1; i < 5; i++) {
                const r = row + i * dir.r;
                const c = col + i * dir.c;
                if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            }
            // Check in the negative direction
            for (let i = 1; i < 5; i++) {
                const r = row - i * dir.r;
                const c = col - i * dir.c;
                if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            }
            if (count >= 5) {
                return true;
            }
        }
        return false;
    }

    function isBoardFull() {
        return board.every(row => row.every(cell => cell !== null));
    }
    
    function resetGame() {
        board = Array(size).fill(null).map(() => Array(size).fill(null));
        currentPlayer = 'black';
        gameOver = false;
        statusElement.textContent = "Black's Turn";
        createBoard();
    }

    resetButton.addEventListener('click', resetGame);
    createBoard();
});```

To play the game, save these three files in the same directory and open the `index.html` file in a web browser. The board will be displayed, and players can take turns by clicking on the intersections of the grid. The game will announce the winner or a draw, and the "Reset Game" button allows for a new game to be started at any time.