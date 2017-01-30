const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('button');

let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  const minMax = (max - min) + min;
  return Math.round(Math.random() * minMax);
}

function randomHole(allHoles) {
  const idx = Math.floor(Math.random() * allHoles.length);
  const hole = allHoles[idx];

  if (hole === lastHole) {
    return randomHole(allHoles);
  }

  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();

  setTimeout(() => {
    timeUp = true;
  }, 10000);
} button.addEventListener('click', startGame);

function bonk(e) {
  if (!e.isTrusted) return;
  score += 1;
  this.classList.remove('up');
  scoreBoard.textContent = score;
} moles.forEach(mole => mole.addEventListener('click', bonk));
