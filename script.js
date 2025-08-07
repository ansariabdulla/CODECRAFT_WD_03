const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X'; // Player
let gameActive = true;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index] !== "") return;

  makeMove(index, 'X');

  if (checkWinner('X')) {
    statusText.textContent = "You win!";
    gameActive = false;
    highlightWinner('X');
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  setTimeout(() => aiMove(), 500);
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
}

function aiMove() {
  if (!gameActive) return;

  let emptyCells = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  if (emptyCells.length === 0) return;

  const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(index, 'O');

  if (checkWinner('O')) {
    statusText.textContent = "AI wins!";
    gameActive = false;
    highlightWinner('O');
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    statusText.textContent = "Your turn";
  }
}

function checkWinner(player) {
  return winningCombinations.some(combo =>
    combo.every(i => board[i] === player)
  );
}

function highlightWinner(player) {
  winningCombinations.forEach(combo => {
    if (combo.every(i => board[i] === player)) {
      combo.forEach(i => cells[i].classList.add('winner'));
    }
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = "Your turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
