let plyertext = document.getElementById("plyertext");
let restartbtn = document.getElementById("restart");
let boxes = Array.from(document.getElementsByClassName("box"));
let winblock = getComputedStyle(document.body).getPropertyValue("--winblock");
let nowin = getComputedStyle(document.body).getPropertyValue("--nowin");

const otext = "O";
const xtext = "X";
let turn = xtext;
let space = Array(9).fill(null);
let countp = 0;

const startgame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxcliced));
};

function boxcliced(e) {
  const id = e.target.id;
  if (!space[id] && countp < 9) {
    space[id] = turn;
    e.target.innerText = turn;

    if (win() !== false) {
      let winbox = win();
      countp = 10;
      winbox.map((box) => (boxes[box].style.backgroundColor = winblock));
      let text = turn + " has win";
      alert(text);
    }
    countp++;
    turn = turn == xtext ? otext : xtext;
  }
  if (countp == 9) {
    alert("its tie \r no one has win !");
    boxes.forEach((box) => (box.style.color = nowin));
  }
}

const win_part = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function win() {
  for (const cond of win_part) {
    let [a, b, c] = cond;
    if (space[a] && space[a] == space[b] && space[a] == space[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartbtn.addEventListener("click", restart);
function restart() {
  space.fill(null);
  countp = 0;

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
    box.style.color = "";
  });
  plyertext = "X , O game";

  turn = xtext;
}

startgame();
