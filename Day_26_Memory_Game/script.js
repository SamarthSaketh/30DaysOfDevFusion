const board = document.getElementById("game-board");
const message = document.getElementById("message");
const movesCounter = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart");
const showAllBtn = document.getElementById("show-all");
const shuffleBtn = document.getElementById("shuffle");
const difficultySelect = document.getElementById("difficulty");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let moves = 0;
let timer = 0;
let interval = null;
let timerStarted = false;

const allCards = [
  'devicon-html5-plain colored','devicon-html5-plain colored',
  'devicon-css3-plain colored','devicon-css3-plain colored',
  'devicon-javascript-plain colored','devicon-javascript-plain colored',
  'devicon-react-original colored','devicon-react-original colored',
  'devicon-mongodb-plain colored','devicon-mongodb-plain colored',
  'devicon-nodejs-plain colored','devicon-nodejs-plain colored',
  'devicon-python-plain colored','devicon-python-plain colored',
  'devicon-git-plain colored','devicon-git-plain colored',
  'devicon-docker-plain colored','devicon-docker-plain colored',
  'devicon-angularjs-plain colored','devicon-angularjs-plain colored'
];

let cardsArray = [];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    interval = setInterval(() => {
      timer++;
      timerDisplay.textContent = `Time: ${timer}s`;
    }, 1000);
  }
}

function startGame() {
  board.innerHTML = '';
  message.textContent = '';
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matches = 0;
  moves = 0;
  movesCounter.textContent = `Moves: ${moves}`;
  timer = 0;
  timerDisplay.textContent = `Time: ${timer}s`;
  clearInterval(interval);
  timerStarted = false;
  showAllBtn.disabled = false;

  const diff = difficultySelect.value;
  let numPairs, cols;

  if(diff === 'easy') {
    numPairs = 4;
    cols = 4;
  } else if(diff === 'medium') {
    numPairs = 8;
    cols = 4;
  } else {
    numPairs = 12;
    cols = 4;
  }

  board.style.setProperty('--cols', cols);

  // Pick N unique icons and duplicate them for pairs
  const selectedIcons = shuffle(allCards.filter((v, i, a) => i % 2 === 0)).slice(0, numPairs);
  cardsArray = shuffle([...selectedIcons, ...selectedIcons]);

  cardsArray.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");

    const front = document.createElement("div");
    front.classList.add("card-front");

    const back = document.createElement("div");
    back.classList.add("card-back");

    const icon = document.createElement("i");
    icon.className = symbol;
    back.appendChild(icon);

    card.appendChild(front);
    card.appendChild(back);

    card.dataset.symbol = symbol;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}


function flipCard() {
  startTimer();
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;
  movesCounter.textContent = `Moves: ${moves}`;

  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    matches += 2;
    resetTurn();
    if (matches === cardsArray.length) {
      message.textContent = `🎉 You won in ${moves} moves and ${timer} seconds!`;
      clearInterval(interval);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function showAllCards() {
  const cards = document.querySelectorAll(".card");
  lockBoard = true;
  showAllBtn.disabled = true;

  let duration;
  const diff = difficultySelect.value;
  if (diff === 'easy') duration = 350;
  else if (diff === 'medium') duration = 800;
  else duration = 1000;

  cards.forEach((card, index) => {
    setTimeout(() => card.classList.add("flipped"), index * 20);
  });

  setTimeout(() => {
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.remove("flipped");
        if (index === cards.length - 1) lockBoard = false;
      }, index * 20);
    });
  }, duration);
}

function shuffleBoard() {
  const cards = Array.from(document.querySelectorAll(".card"));
  lockBoard = true;

  const shuffledCards = shuffle(cards.slice());

  shuffledCards.forEach((card, i) => {
    const oldPos = card.getBoundingClientRect();
    const targetCard = cards[i];
    const targetPos = targetCard.getBoundingClientRect();

    const dx = targetPos.left - oldPos.left;
    const dy = targetPos.top - oldPos.top;

    setTimeout(() => {
      card.style.transition = "transform 0.8s ease";
      card.style.transform = `translate(${dx}px, ${dy}px)`;
    }, i * 150);
  });

  setTimeout(() => {
    shuffledCards.forEach(card => {
      card.style.transition = "";
      card.style.transform = "";
      board.appendChild(card);
    });
    lockBoard = false;
  }, 150 * cards.length + 800);
}

restartBtn.addEventListener("click", startGame);
showAllBtn.addEventListener("click", showAllCards);
shuffleBtn.addEventListener("click", shuffleBoard);
difficultySelect.addEventListener("change", startGame);

startGame();
