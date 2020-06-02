//Array to track the board
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

//Options available
const options = document.querySelectorAll("[name='player-option']");
//Board
const rows = document.querySelectorAll(".row");
//Result area
const result = document.querySelector(".result");

//Players option
let ai = "O";
let human = "X";

//Score to decide the next move of bot
const scores = {
  X: 10,
  O: -10,
  tie: 0,
};

//Function to update selected option and setting the score for bot
const updateSelector = (value) => {
  if (value === "1") {
    human = "X";
    ai = "O";
  } else {
    human = "O";
    ai = "X";
  }

  //Update the score based on selector
  scores[human] = -10;
  scores[ai] = 10;
};

//Update player option initally
let start = options[0].value;
updateSelector(start);

//Update player option on option change
options.forEach((e) => {
  e.addEventListener("change", (f) => {
    const { value } = f.target;
    updateSelector(value);
  });
});

//Handle the player click on grid
rows.forEach((e) => {
  //Get the grand child span
  const span = e.children[0].children[0];

  e.addEventListener("click", (f) => {
    //Get which grid is clicked
    const dataRow = +e.getAttribute("data-row");
    const dataColumn = +e.getAttribute("data-column");

    //If the grid is not marked
    if (board[dataRow][dataColumn] === "") {
      //Player move
      span.innerHTML = human;
      board[dataRow][dataColumn] = human;

      //Bot move
      const botMove = bestMove();

      //If bot can make move then update the board
      if (botMove) {
        board[botMove.i][botMove.j] = ai;
        const botPlace = document.querySelector(
          `[data-row='${botMove.i}'][data-column='${botMove.j}'] span`
        );

        botPlace.innerHTML = ai;
      }

      //Get match's result and show it on the dash board
      const outcome = checkWinner();
      if (outcome) {
        if (outcome === "tie") {
          result.innerHTML = outcome;
        } else {
          result.innerHTML = `${outcome} wins`;
        }
      }
    }
  });
});

//Check all the values are equal
const equals3 = (a, b, c) => {
  return a == b && b == c && a != "";
};

//Check match winner
const checkWinner = () => {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  //Are still moves left
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        openSpots++;
      }
    }
  }

  //Return winner
  if (winner == null && openSpots == 0) {
    return "tie";
  } else {
    return winner;
  }
};

//Bot move
const bestMove = () => {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == "") {
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        board[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }

  return move;
};

//Calculate where next move should take place
const minimax = (board, depth, isMaximizing) => {
  //Check the winner and return the score
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == "") {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == "") {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
};
