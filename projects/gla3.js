var playerOne = "R";
var playerTwo = "Y";
var currentPlayer = playerOne;

var gameEnd = false;
var board;
var currentColumns;

var rows = 6;
var columns = 3;

window.onload = function() {
  setGame();
  addResetButton();
}

function setGame() {
  board = [];
  currentColumns = [5, 5, 5];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(' ');
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameEnd) {
    return;
  }
  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  
  if (r < 0) {
    return;
  }

  if (board[r][c] !== ' ') {
    return;
  }

  let currentRow = currentColumns[c];
  if (currentRow < 0) {
    return;
  }

  board[currentRow][c] = currentPlayer; 
  let tile = document.getElementById(currentRow.toString() + "-" + c.toString());
  if (currentPlayer === playerOne) {
    tile.classList.add("red-disc");
    currentPlayer = playerTwo; 
  }
  else {
    tile.classList.add("yellow-disc");
    currentPlayer = playerOne; 
  }
  
  currentRow -= 1;
  currentColumns[c] = currentRow;

  checkWinner();
}

function checkWinner() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      if (board[r][c] != ' ') {
        if (board[r][c] == board[r][c+1] && board[r][c] == board[r][c+2]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  for (let c = 0; c < columns; c++) { 
    for (let r = 0; r < rows - 2; r++) 
      if (board[r][c] != ' ') {
        if (board[r][c] == board[r+1][c] && board[r][c] == board[r+2][c]) {
          setWinner(r, c);
          return;
        }
      }
    }

    for (let r = 0; r < rows - 2; r++){
      for (let c = 0; c< columns - 2; c++) {
        if (board[r][c] != ' ') {
          if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] ) {
            setWinner(r, c);
            return;
          }
        }
      }
    }

    for (let r = 2; r < rows ; r++){
      for (let c = 0; c< columns - 2; c++) {
        if (board[r][c] != ' ') {
          if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] ) {
            setWinner(r, c);
            return;
          }
        }
      }
    }
}

function setWinner(r, c) {
  let winner;
  if (board[r][c] == playerOne) {
    winner = "Player One Wins!";
  } else {
    winner = "Player Two Wins!";
  }
  document.getElementById("winner").innerText = winner; // Set winner message
  gameEnd = true;
}




function addResetButton() {
  let resetButton = document.createElement("button");
  resetButton.textContent = "RESET GAME";
  resetButton.addEventListener("click", resetGame);
  document.getElementById("board").after(resetButton);
}

function resetGame() {
  board = [];
  currentColumns = [5, 5, 5];
  gameEnd = false;
  currentPlayer = playerOne;
  document.getElementById("winner").innerText = "";

  let boardElement = document.getElementById("board");
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }

  setGame();
}
