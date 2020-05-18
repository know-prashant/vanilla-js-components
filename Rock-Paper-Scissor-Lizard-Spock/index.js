//Order in which options are available
const arr = [
  {
    image: "lizard.png",
    name: "Lizard",
  },
  {
    image: "paper.png",
    name: "Paper",
  },
  {
    image: "rock.png",
    name: "Rock",
  },
  {
    image: "scissor.png",
    name: "Scissor",
  },
  {
    image: "spock.png",
    name: "Spock",
  },
];

//Rule of who has win over whom
const rule = {
  Lizard: ["Spock", "Paper"],

  Paper: ["Rock", "Spock"],

  Rock: ["Lizard", "Scissor"],

  Scissor: ["Paper", "Lizard"],

  Spock: ["Scissor", "Rock"],
};

//Folder in which images are stored
const imageFolderPath = "assets";

//All the options of player 1
const player1Options = document.querySelectorAll(
  "#player1 .available-options .option"
);

//All the options of bot
const botOptions = document.querySelectorAll(
  "#player2 .available-options .option"
);

//Where selected option of player 1 will be shown
const playerShowArea = document.querySelector(
  "#player1 .selected-option .option"
);

//Where selected option of bot will  be  shown
const botShowArea = document.querySelector("#player2 .selected-option .option");

//Player 1 and bot score
const player1Score = document.querySelector("#player1-score");
const player2Score = document.querySelector("#player2-score");

//Where message will be shown
const roundMessage = document.querySelector("#round-message");

player1Options.forEach((e) => {
  e.addEventListener("click", () => {
    play(e);
  });
});

const play = (e) => {
  //Get the index of the option selected by player
  const player1 = e.getAttribute("data-index");

  //Number of options available
  const length = arr.length;

  //Generate a random number between number of options available for bot
  const player2 = Math.floor(Math.random() * length);

  //Show the player1 selected option and highlight it
  showPlayerOption(player1, playerShowArea);
  highlightSelectedOption(player1, player1Options);

  //Show the bot selected option
  showPlayerOption(player2, botShowArea);
  highlightSelectedOption(player2, botOptions);

  //Calculate the result
  calculateScore(player1, player2);
};

//Generate an image element
const generateImgElement = (index) => {
  const { image, name } = arr[index];
  const imgElement = document.createElement("img");
  imgElement.src = `${imageFolderPath}/${image}`;
  imgElement.alt = name;
  imgElement.title = name;
  return imgElement;
};

//Show selected option
const showPlayerOption = (index, showArea) => {
  //Append the generated image to the show area
  const imgElement = generateImgElement(index);
  showArea.innerHTML = "";
  showArea.append(imgElement);
};

const highlightSelectedOption = (index, options) => {
  //Remove the active class from all options
  options.forEach((e) => {
    e.classList.remove("active");
  });

  //Add the active class to the selected option
  options[index].classList.add("active");
};

//Change the score
const addScore = (player) => {
  const { innerHTML } = player;
  player.innerHTML = Number(innerHTML) + 1;
};

const showMessage = (msg) => {
  //Show the message
  roundMessage.innerHTML = "";
  roundMessage.innerHTML = msg;
};

const calculateScore = (player1, player2) => {
  //Player 1 choice
  const player1Choice = arr[player1].name;

  //Bot choice
  const player2Choice = arr[player2].name;

  //Get player 1 selected choice rule
  const player1Strength = rule[player1Choice];

  //Check the case and who wins the round
  if (player1Choice === player2Choice) {
    showMessage("draw");
  } else if (player1Strength.includes(player2Choice)) {
    //Update the score and show message who won the round
    addScore(player1Score);
    showMessage("player 1 wins");
  } else {
    //Update the score and show message who won the round
    addScore(player2Score);
    showMessage("Bot wins");
  }
};

const reset = () => {
  botShowArea.innerHTML = "";
  playerShowArea.innerHTML = "";
  roundMessage.innerHTML = "Choose your option";
  player2Score.innerHTML = "0";
  player1Score.innerHTML = "0";
  player1Options.forEach((e) => {
    e.classList.remove("active");
  });
  botOptions.forEach((e) => {
    e.classList.remove("active");
  });
};

document.querySelector(".reset").addEventListener("click", reset);
