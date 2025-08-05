const startBtn = document.getElementById("start-btn");
const categorySelect = document.getElementById("category");
const quizBox = document.getElementById("quiz-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

let selectedQuestions = [];
let currentQuestion = 0;
let score = 0;

// Start Quiz
startBtn.addEventListener("click", () => {
  const category = categorySelect.value;
fetch(`./quiz_categories/${category}_questions.json`)
  .then(res => res.json())
  .then(data => {
    selectedQuestions = pickQuestions(data.questions); // 👈 FIX HERE
    document.getElementById("start-box").classList.add("hidden");
    quizBox.classList.remove("hidden");
    showQuestion();
  });

});

// Pick 5 questions: 1 easy, 1 medium, 1 hard, 2 advanced
function pickQuestions(data) {
  const easy = data.filter(q => q.difficulty === "easy");
  const medium = data.filter(q => q.difficulty === "medium");
  const hard = data.filter(q => q.difficulty === "hard");
  const advanced = data.filter(q => q.difficulty === "advanced");

  return [
    randomItem(easy),
    randomItem(medium),
    randomItem(hard),
    ...randomItems(advanced, 2)
  ];
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Show question
function showQuestion() {
  const q = selectedQuestions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option");
    btn.onclick = () => selectAnswer(idx);
    optionsEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
}

function selectAnswer(index) {
  const correct = selectedQuestions[currentQuestion].answer;
  const buttons = document.querySelectorAll(".option");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.style.background = "#b2f2bb";
    if (i === index && i !== correct) btn.style.background = "#ffa8a8";
  });

  if (index === correct) score++;
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < selectedQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = score;
}
