// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    const restartButton = document.getElementById('restartButton');
    const clickSound = document.getElementById('clickSound');
    const winSound = document.getElementById('winSound');
    const drawSound = document.getElementById('drawSound');
    let currentPlayer = 'X';
    let gameState = Array(9).fill('');
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        if (gameState[cellIndex] !== '' || !gameActive) {
            return;
        }

        clickSound.play();

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            gameActive = false;
            displayWin();
            return;
        } else if (gameState.every(cell => cell !== '')) {
            gameActive = false;
            displayDraw();
            return;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    }

    function displayWin() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            const cellA = cells[a];
            const cellB = cells[b];
            const cellC = cells[c];

            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                cellA.classList.add('win');
                cellB.classList.add('win');
                cellC.classList.add('win');

                modalMessage.textContent = `${gameState[a]} wins!`;
                showModal();
                winSound.play();
            }
        }
    }

    function displayDraw() {
        modalMessage.textContent = 'It\'s a draw!';
        showModal();
        drawSound.play();
    }

    function showModal() {
        modal.style.display = 'flex';
    }

    function restartGame() {
        currentPlayer = 'X';
        gameState = Array(9).fill('');
        gameActive = true;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
        modal.style.display = 'none';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', () => {
        restartGame();
        clickSound.play();
    });

    restartGame();
});
