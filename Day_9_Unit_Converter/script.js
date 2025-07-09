const units = {
  Length: ["Meters", "Feet", "Kilometers", "Miles"],
  Weight: ["Kilograms", "Pounds", "Grams", "Ounces"],
  Temperature: ["Celsius", "Fahrenheit", "Kelvin"]
};

const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

function populateUnits() {
  const category = document.getElementById("category").value;
  const from = document.getElementById("fromUnit");
  const to = document.getElementById("toUnit");
  from.innerHTML = to.innerHTML = "";
  units[category].forEach(unit => {
    from.add(new Option(unit, unit));
    to.add(new Option(unit, unit));
  });
  convert();
}

function convert() {
  const category = document.getElementById("category").value;
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;
  const val = parseFloat(document.getElementById("value").value);
  if (isNaN(val)) return;

  let result = 0;
  if (from === to) result = val;
  else {
    switch (category) {
      case "Length": result = convertGeneric(from, to, val, {Meters:1,Feet:0.3048,Kilometers:1000,Miles:1609.34}); break;
      case "Weight": result = convertGeneric(from, to, val, {Kilograms:1,Pounds:0.453592,Grams:0.001,Ounces:0.0283495}); break;
      case "Temperature": result = convertTemp(from, to, val); break;
    }
  }

  document.getElementById("result").textContent = `Result: ${result.toFixed(2)} ${to}`;
  updateHistory(`${val} ${from} → ${result.toFixed(2)} ${to}`);
  drawBarChart(val, result, from, to);
}

function convertGeneric(from, to, val, rates) {
  return val * rates[from] / rates[to];
}

function convertTemp(from, to, val) {
  let c = from === "Celsius" ? val : from === "Fahrenheit" ? (val - 32) * 5 / 9 : val - 273.15;
  return to === "Celsius" ? c : to === "Fahrenheit" ? (c * 9 / 5) + 32 : c + 273.15;
}




document.getElementById("themeToggle").onclick = () => document.body.classList.toggle("dark");
document.getElementById("value").oninput = convert;
document.getElementById("clearBtn").onclick = () => {
  document.getElementById("value").value = "";
  document.getElementById("result").textContent = "";
};
document.getElementById("swapBtn").onclick = () => {
  let from = document.getElementById("fromUnit");
  let to = document.getElementById("toUnit");
  [from.value, to.value] = [to.value, from.value];
  convert();
};
document.getElementById("copyBtn").onclick = () => {
  const result = document.getElementById("result").textContent;
  navigator.clipboard.writeText(result);
  alert("Copied to clipboard!");
};
document.getElementById("exportBtn").onclick = () => {
  const category = document.getElementById("category").value;
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;
  const value = document.getElementById("value").value;
  const resultText = document.getElementById("result").textContent;

  const exportText = 
`Category: ${category}
From: ${from}
To: ${to}
Value: ${value} ${from}
Result: ${resultText.replace("Result: ", "")}`;

  const blob = new Blob([exportText], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "conversion_result.txt";
  a.click();
};






window.onload = () => { populateUnits();  };