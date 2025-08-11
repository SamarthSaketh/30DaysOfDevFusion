let wins = 0;
let losses = 0;
let draws = 0;

function play(userChoice) {
  const choices = ["stone", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  const icons = {
    stone: "https://cdn-icons-png.flaticon.com/512/6224/6224567.png",
    paper: "https://cdn-icons-png.flaticon.com/512/6558/6558596.png",
    scissors: "https://cdn-icons-png.flaticon.com/512/6347/6347076.png"
  };

  let resultText = "";
  if (userChoice === computerChoice) {
    resultText = "It's a draw!";
    draws++;
  } else if (
    (userChoice === "stone" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "stone") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    resultText = "🎉 You Win!";
    wins++;
  } else {
    resultText = "💻 Computer Wins!";
    losses++;
  }

  document.getElementById("result").innerHTML = `
    <div class="result-icons">
      <p>You chose: <img src="${icons[userChoice]}" alt="${userChoice}"></p>
      <p>Computer chose: <img src="${icons[computerChoice]}" alt="${computerChoice}"></p>
    </div>
    <p>${resultText}</p>
  `;

  updateScore();
}

function updateScore() {
  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
  document.getElementById("draws").textContent = draws;
}

function resetScore() {
  wins = 0;
  losses = 0;
  draws = 0;
  updateScore();
  document.getElementById("result").innerHTML = "<p>Make your move!</p>";
}
