const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let isGameActive = true;
let moves = 0;

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            isGameActive = false;
            message.textContent = `Player ${currentPlayer} wins!`;
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            return;
        }
    }

    if (moves === 9) {
        isGameActive = false;
        message.textContent = "It's a draw!";
    }
}

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.id;

    if (!isGameActive || cell.textContent !== "") return;

    cell.textContent = currentPlayer;
    moves++;
    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });

    currentPlayer = "X";
    isGameActive = true;
    moves = 0;
    message.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);
