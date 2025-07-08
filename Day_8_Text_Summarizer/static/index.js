async function summarizeText() {
  const inputText = document.getElementById("inputText").value.trim();
  const loadingDiv = document.getElementById("loading");
  const outputDiv = document.getElementById("summaryOutput");
  const outputContainer = document.getElementById("summaryContainer");
  const printBtn = document.getElementById("printBtn");

  if (!inputText) {
    alert("Please enter or upload text to summarize.");
    return;
  }

  loadingDiv.style.display = "block";
  outputContainer.classList.add("d-none");
  printBtn.classList.add("d-none");

  try {
    const response = await fetch("/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputText }),
    });

    const data = await response.json();
    outputDiv.innerText = data.summary;
    outputContainer.classList.remove("d-none");
    printBtn.classList.remove("d-none");
  } catch (err) {
    outputDiv.innerText = "❌ Error: Unable to summarize the text.";
    outputContainer.classList.remove("d-none");
  }

  loadingDiv.style.display = "none";
}


document.getElementById("fileInput").addEventListener("change", function () {
  const file = this.files[0];
  if (file && file.name.endsWith(".txt")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("inputText").value = e.target.result;
    };
    reader.readAsText(file);
  } else {
    alert("Please upload a valid .txt file.");
  }
});

function printSummary() {
  const summary = document.getElementById("summaryOutput").innerText;
  if (!summary.trim()) {
    alert("No summary available to print.");
    return;
  }

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Summary</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            line-height: 1.6;
            max-width: 900px;
            margin: auto;
          }
          h1 {
            text-align: center;
            color: #333;
          }
          .content {
            white-space: pre-wrap;
            word-wrap: break-word;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <h1>🧠 Summary</h1>
        <div class="content">${summary}</div>
        <script>
          window.onload = () => {
            window.print();
            window.onafterprint = () => window.close();
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
function clearPage() {
  location.reload(); 
}

const toggleSwitch = document.getElementById("themeToggle");

// Apply theme on load
window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme") || "light";
  document.body.classList.add(`${theme}-mode`);
  toggleSwitch.checked = theme === "dark";
});

// Toggle theme on switch
toggleSwitch.addEventListener("change", () => {
  if (toggleSwitch.checked) {
    document.body.classList.replace("light-mode", "dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.replace("dark-mode", "light-mode");
    localStorage.setItem("theme", "light");
  }
});
