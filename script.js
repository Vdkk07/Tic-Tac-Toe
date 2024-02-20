const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currenPlayer;
let gameGrid;

let winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// function for initialise the same
function initGame() {
  currenPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  //   UI pr empty bhi karan hai boxes ko
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";

    // initilise box with CSS properties again
    box.classList = `box box${index + 1}`;
  });

  newGameBtn.classList.remove("active");
  gameInfo.textContent = `Current Player - ${currenPlayer} `;
}

initGame();

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function swapTurn() {
  if (currenPlayer === "X") {
    currenPlayer = "0       ";
  } else {
    currenPlayer = "X";
  }

  // UI update
  gameInfo.innerText = `Current Player - ${currenPlayer}`;
}

function checkWinner() {
  let answer = "";

  winningPosition.forEach((position) => {
    // all 3 boxes should be non-empty and exactly have same value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // check winner
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "0";
      }

      //   disable pointerEvents
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // now we know X/0 is a winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  //   we have winner
  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add = "active";
    return;
  }

  //   check whether their is tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });

  // board is filled , game is tied
  if (fillCount === 9) {
    gameInfo.innerText = "It's a Tie!";
    newGameBtn.classList.add("active");
  }
}
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currenPlayer;
    gameGrid[index] = currenPlayer;
    boxes[index].style.pointerEvents = "none";
    // swap turn
    swapTurn();

    // check winner
    checkWinner();
  }
}

newGameBtn.addEventListener("click", initGame);
