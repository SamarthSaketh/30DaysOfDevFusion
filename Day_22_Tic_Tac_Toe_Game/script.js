document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const boardEl = document.getElementById("board");
  const statusEl = document.getElementById("status");
  const modeToggleBtn = document.getElementById("modeToggleBtn");
  const restartBtn = document.getElementById("restartBtn");
  const aiActivateLayer = document.getElementById("aiActivateLayer");

  const gameState = {
    board: Array(9).fill(""),
    currentPlayer: "X",
    gameActive: true,
    vsComputer: false,
    inputLocked: false,
    playerNames: {
      X: "Player 1",
      O: "Player 2",
      Computer: "Computer"
    },
    winningCombos: [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
  };

  function promptPlayerNames() {
    if (gameState.vsComputer) {
      const humanName = prompt("Enter your name:", "Human") || "Human";
      gameState.playerNames.X = humanName;
      gameState.playerNames.O = gameState.playerNames.Computer;
    } else {
      const p1 = prompt("Enter Player 1 name:", "Player 1") || "Player 1";
      const p2 = prompt("Enter Player 2 name:", "Player 2") || "Player 2";
      gameState.playerNames.X = p1;
      gameState.playerNames.O = p2;
    }
    updateStatus();
  }

  function init() {
    gameState.board = Array(9).fill("");
    gameState.currentPlayer = "X";
    gameState.gameActive = true;
    gameState.inputLocked = false;
    boardEl.innerHTML = "";
    restartBtn.style.display = "none";

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.setAttribute("aria-disabled", "false");
      cell.addEventListener("click", handleCellClick);
      boardEl.appendChild(cell);
    }
    updateStatus();
    if (gameState.vsComputer && gameState.currentPlayer === "O") {
      setTimeout(computerPlay, 700);
    }
  }

  function updateStatus(message) {
    if (message) {
      statusEl.textContent = message;
      restartBtn.style.display = "inline-block";
    } else {
      const playerName = gameState.playerNames[gameState.currentPlayer] || "Player";
      statusEl.textContent = `${playerName}'s turn`;
    }
  }

  function handleCellClick(e) {
    if (!gameState.gameActive || gameState.inputLocked) return;
    const idx = Number(e.target.dataset.index);
    if (gameState.board[idx] !== "") return;

    makeMove(idx, gameState.currentPlayer);
  }

  function makeMove(idx, player) {
    gameState.board[idx] = player;
    const cell = boardEl.children[idx];
    cell.textContent = player;
    cell.setAttribute("aria-disabled", "true");

    const result = checkWinner();
    if (result) {
      gameState.gameActive = false;
      if (result === "Draw") {
        updateStatus("It's a draw!");
      } else {
        updateStatus(`${gameState.playerNames[result.player]} won!`);
        highlightWin(result.combo);
      }
      return;
    }

    gameState.currentPlayer = player === "X" ? "O" : "X";
    updateStatus();
    
    if (gameState.vsComputer && gameState.currentPlayer === "O") {
      gameState.inputLocked = true;
      setTimeout(() => {
        computerPlay();
        gameState.inputLocked = false;
      }, 700);
    }
  }

  function highlightWin(combo) {
    combo.forEach(i => boardEl.children[i].classList.add("win"));
  }

  function checkWinner() {
    for (const combo of gameState.winningCombos) {
      const [a, b, c] = combo;
      if (gameState.board[a] && gameState.board[a] === gameState.board[b] && gameState.board[a] === gameState.board[c]) {
        return { player: gameState.board[a], combo };
      }
    }
    if (!gameState.board.includes("")) return "Draw";
    return null;
  }

  // MINIMAX ALGORITHM
  function computerPlay() {
    const bestMove = findBestMove(gameState.board, "O");
    makeMove(bestMove, "O");
  }

  function findBestMove(board, player) {
    const empties = board.map((v, i) => v === "" ? i : -1).filter(i => i !== -1);
    let bestScore = -Infinity;
    let bestMove;

    for (const i of empties) {
      board[i] = player;
      const score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
    return bestMove;
  }

  function minimax(board, depth, isMaximizingPlayer) {
    const result = checkWinnerOnBoard(board);
    if (result) {
      if (result === "Draw") return 0;
      return result.player === "O" ? 10 : -10;
    }

    const empties = board.map((v, i) => v === "" ? i : -1).filter(i => i !== -1);
    if (empties.length === 0) return 0;

    if (isMaximizingPlayer) {
      let bestScore = -Infinity;
      for (const i of empties) {
        board[i] = "O";
        const score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(bestScore, score);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (const i of empties) {
        board[i] = "X";
        const score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(bestScore, score);
      }
      return bestScore;
    }
  }

  function checkWinnerOnBoard(board) {
    for (const combo of gameState.winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { player: board[a], combo };
      }
    }
    if (!board.includes("")) return "Draw";
    return null;
  }

  // ANIMATION LOGIC
  function createShapes(count = 20) {
    aiActivateLayer.innerHTML = '<div id="gridLines"></div><div id="glitchText" aria-live="polite" aria-atomic="true">Computer Mode Activating...</div>';
    for (let i = 0; i < count; i++) {
      const shape = document.createElement("div");
      shape.classList.add("shape");
      shape.style.left = `${Math.random() * window.innerWidth}px`;
      shape.style.top = `${Math.random() * window.innerHeight}px`;
      aiActivateLayer.appendChild(shape);
    }
  }

  async function toggleMode() {
    gameState.vsComputer = !gameState.vsComputer;
    promptPlayerNames();

    const gameContainer = document.querySelector(".game-container");
    await anime({
      targets: gameContainer,
      opacity: [1, 0],
      duration: 400,
      easing: "easeInOutQuad"
    }).finished;

    if (gameState.vsComputer) {
      showAIActivation();
      await anime({
        targets: body,
        backgroundColor: ["#6a11cb", "#000"],
        color: ["#fff", "#00ff99"],
        duration: 1500,
        easing: "easeInOutQuad"
      }).finished;
      await new Promise(resolve => setTimeout(resolve, 1500));
      hideAIActivation();
      body.classList.add("pvc");
      body.classList.remove("pvp");
      modeToggleBtn.textContent = "Switch to Manual Mode";
    } else {
      body.classList.add("pvp");
      body.classList.remove("pvc");
      modeToggleBtn.textContent = "Switch to Computer Mode";
    }

    init();
    await anime({
      targets: gameContainer,
      opacity: [0, 1],
      duration: 400,
      easing: "easeInOutQuad"
    }).finished;
  }

  function showAIActivation() {
    aiActivateLayer.style.display = "block";
    createShapes();
    const shapes = document.querySelectorAll(".shape");
    shapes.forEach(shape => {
      anime({
        targets: shape,
        translateX: () => anime.random(-100, 100),
        translateY: () => anime.random(-100, 100),
        rotate: () => anime.random(-180, 180),
        duration: () => anime.random(500, 1000),
        easing: "easeInOutQuad",
        loop: true
      });
    });
  }

  function hideAIActivation() {
    aiActivateLayer.style.display = "none";
  }

  // EVENT LISTENERS
  modeToggleBtn.addEventListener("click", toggleMode);
  restartBtn.addEventListener("click", init);
  window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "c") toggleMode();
    if (e.key.toLowerCase() === "r") init();
  });

  // INITIAL SETUP
  promptPlayerNames();
  init();
});