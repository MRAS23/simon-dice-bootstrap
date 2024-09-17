window.sequencePC = [];

const colors = ["red", "blue", "green", "yellow"];

function getRandomColor() {
  return sequencePC.push(colors[Math.round(Math.random() * 3)]);
}

function startGame() {
  showBoard();
  let rounds = document.querySelector("#movements-counter");
  rounds.innerHTML = 0;
  getRandomColor();
  playSequencePC();
  hideStartButton();
}

document.querySelector("#start-button").onclick = function (event) {
  event.preventDefault();

  setTimeout(() => {
    startGame();
  }, 500);
};

let playerSequence = [];

let $square = document.querySelectorAll(".square");

for (let i = 0; i < $square.length; i++) {
  $square[i].addEventListener("click", () => handlePlayerSequence(i));
}

let clicksCounter = 0;

function handlePlayerSequence(color) {
  if (color === 0) {
    playerSequence.push("red");
  } else if (color === 1) {
    playerSequence.push("blue");
  } else if (color === 2) {
    playerSequence.push("green");
  } else if (color === 3) {
    playerSequence.push("yellow");
  }

  if (compareColorArrays(playerSequence[clicksCounter], sequencePC[clicksCounter])) {
    clicksCounter++;
    if (clicksCounter === sequencePC.length) {
      setTimeout(() => {
        nextRound();
      }, 1000);
    }
  } else {
    resetGame();
  }

  return false;
}

function nextRound() {
  countRounds();
  getRandomColor();
  playSequencePC();
  playerSequence = [];
  clicksCounter = 0;
}

function resetGame() {
  hideBoard();
  showPlayAgainScreen();
  updateRoundsMessage();
  clicksCounter = 0;
  hideTitle();
}

function compareColorArrays(color1, color2) {
  if (color1 === color2) {
    return true;
  } else {
    return false;
  }
}

function activateSquare(color) {
  for (let i = 0; i < colors.length; i++) {
    if (color === colors[i]) {
      playSound(color);
      $square[i].classList.add("active-square");
      setTimeout(() => {
        $square[i].classList.remove("active-square");
      }, 300);
    }
  }
}

function playSequencePC() {
  disableButtons();
  for (let i = 0; i < sequencePC.length; i++) {
    setTimeout(() => {
      activateSquare(sequencePC[i]);
    }, (i + 1) * 600);

    if (i === sequencePC.length - 1) {
      setTimeout(() => {
        enableButtons();
      }, (i + 1) * 600);
    }
  }
}

function countRounds() {
  let rounds = document.querySelector("#movements-counter");
  rounds.innerHTML++;
}

function showStartButton() {
  document.querySelector("#start-button").className = "visible";
}

function hideStartButton() {
  document.querySelector("#start-button").className = "hidden";
}

function showPlayAgainScreen() {
  document.querySelector("#container-play-again-screen").className = " ";
}

function hidePlayAgainScreen() {
  document.querySelector("#container-play-again-screen").className = "hidden";
}

function showBoard() {
  document.querySelector("#board").className = "container-md";
}

function hideBoard() {
  document.querySelector("#board").className = "hidden";
}

function showTitle() {
  document.querySelector("h1").className = " ";
}

function hideTitle() {
  document.querySelector("h1").className = "hidden";
}

document.querySelector("#play-again-button").onclick = function (event) {
  event.preventDefault();

  showTitle();
  playerSequence = [];
  sequencePC = [];
  startGame();
  hidePlayAgainScreen();
};

function updateRoundsMessage() {
  let numberOfRounds = document.querySelector("#movements-counter").innerHTML;
  let rounds = document.querySelector("#score-counter");
  rounds.innerHTML = `Llegaste hasta la ronda #${numberOfRounds}!`;
}

let sounds = {
  red: new Audio("sonidos/simonSound1.mp3"),
  blue: new Audio("sonidos/simonSound2.mp3"),
  green: new Audio("sonidos/simonSound3.mp3"),
  yellow: new Audio("sonidos/simonSound4.mp3"),
};

function playSound(color) {
  sounds[color].currentTime = 0;
  sounds[color].play();
}

for (let i = 0; i < $square.length; i++) {
  $square[i].addEventListener("click", () => playSound(colors[i]));
}

let $board = document.querySelector("#board");
function disableButtons() {
  $board.id = "inactive-square";
}

function enableButtons() {
  $board.id = "board";
}
