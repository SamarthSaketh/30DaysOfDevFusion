const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll("button[data-key]");
const scientificSection = document.querySelector(".scientific-buttons");
const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");
const shortcutsBtn = document.getElementById('shortcutsBtn');
const shortcutsModal = document.getElementById('shortcutsModal');
const closeShortcuts = document.getElementById('closeShortcuts');

let expression = "";
let history = [];

shortcutsBtn.addEventListener('click', () => {
  shortcutsModal.classList.remove('hidden');
});

closeShortcuts.addEventListener('click', () => {
  shortcutsModal.classList.add('hidden');
});

// Optional: Close modal on outside click
window.addEventListener('click', (e) => {
  if (e.target === shortcutsModal) {
    shortcutsModal.classList.add('hidden');
  }
});
// Evaluate Expression
function evaluateExpression() {
  if (!expression || expression.trim() === "") {
    resultDisplay.textContent = "";
    return null;
  }

  try {
    let expr = expression;

    // Factorial
    expr = expr.replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)));

    // Constants
    expr = expr.replace(/π/g, Math.PI).replace(/e/g, Math.E);

    // Square root
    expr = expr.replace(/√\(/g, "Math.sqrt(");

    // Trig functions in degrees
    expr = expr.replace(/(sin|cos|tan)\(([^()]+)\)/g, (_, fn, val) =>
      `Math.${fn}(toRadians(${val}))`
    );

    // Logs
    expr = expr.replace(/log\(/g, "Math.log10(");
    expr = expr.replace(/ln\(/g, "Math.log(");

    // Power
    expr = expr.replace(/\^/g, "**");

    // Evaluate safely
    const result = Function("toRadians", `"use strict"; return (${expr})`)(toRadians);
    resultDisplay.textContent = `= ${+result.toFixed(10)}`;
    return result;
  } catch (err) {
    resultDisplay.textContent = "";
    return null;
  }
}


function updateDisplay() {
  expressionDisplay.textContent = expression;
  evaluateExpression(); // Now it's safe
}


// Factorial Function
function factorial(n) {
  if (n < 0) return NaN;
  return n === 0 ? 1 : n * factorial(n - 1);
}

// Convert degrees to radians
function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-key");

    switch (key) {
      case "C":
        expression = "";
        resultDisplay.textContent = "";
        break;
      case "←":
        expression = expression.slice(0, -1);
        break;
      case "=":
        const finalResult = evaluateExpression();
        if (finalResult !== null) {
          history.unshift(`${expression} = ${finalResult}`);
          if (history.length > 10) history.pop();
          updateHistory();
          expression = finalResult.toString();
        }
        break;
      case "±":
        if (expression) {
          if (expression.startsWith("-")) expression = expression.slice(1);
          else expression = "-" + expression;
        }
        break;
      default:
        expression += key;
    }
    updateDisplay();
  });
});

// Toggle scientific section
document.getElementById("modeToggle").addEventListener("click", () => {
  scientificSection.classList.toggle("hidden");
});

// Toggle history panel
document.getElementById("historyToggle").addEventListener("click", () => {
  historyPanel.classList.toggle("hidden");
});

// Clear history
document.getElementById("clearHistory").addEventListener("click", () => {
  history = [];
  updateHistory();
});

function updateHistory() {
  historyList.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    li.addEventListener("click", () => {
      expression = entry.split(" = ")[0];
      updateDisplay();
    });
    historyList.appendChild(li);
  });
}

// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  const isDark = document.body.classList.contains("dark-theme");
  document.getElementById("themeToggle").textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Load Theme from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  document.body.classList.remove("light-theme");
  document.getElementById("themeToggle").textContent = "☀️";
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (e.key === "Enter") {
    e.preventDefault();
    const result = evaluateExpression();
    if (result !== null) {
      history.unshift(`${expression} = ${result}`);
      if (history.length > 10) history.pop();
      updateHistory();
      expression = result.toString();
    }
  } else if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
  } else if ("0123456789+-*/().".includes(e.key)) {
    expression += e.key;
  } else if (key === "p") {
    expression += "π";
  } else if (key === "e") {
    expression += "e";
  } else if (e.key === "^") {
    expression += "^";
  } else if (e.key === "!") {
    expression += "!";
  } else if (key === "s") {
    expression += "sin(";
  } else if (key === "c") {
    expression += "cos(";
  } else if (key === "t") {
    expression += "tan(";
  } else if (key === "r") {
    expression += "√(";
  } else if (key === "l") {
    if (e.shiftKey) {
      expression += "ln(";
    } else {
      expression += "log(";
    }
  }

  updateDisplay();
});


