const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const repeat = document.getElementById("repeat");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeSwitcher = document.getElementById("themeSwitcher");
const importFile = document.getElementById("importFile");
const voiceBtn = document.getElementById("voiceBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let currentTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(currentTheme);
themeSwitcher.value = currentTheme;

themeSwitcher.addEventListener("change", () => {
  document.body.className = "";
  document.body.classList.add(themeSwitcher.value);
  localStorage.setItem("theme", themeSwitcher.value);
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks
    .filter(task => {
      if (currentFilter === "all") return true;
      if (currentFilter === "active") return !task.done;
      if (currentFilter === "completed") return task.done;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task" + (task.done ? " completed" : "");
      li.setAttribute("draggable", true);
      li.setAttribute("data-index", index);

      li.addEventListener("dragstart", dragStart);
      li.addEventListener("dragover", dragOver);
      li.addEventListener("drop", drop);

      li.innerHTML = `
        <div>
          <span>${task.text}</span>
          <div class="meta">📅 ${task.date || "No date"} | 🔁 ${task.repeat} | 🔥 ${task.priority}</div>
        </div>
        <div>
          <button onclick="toggleComplete(${index})">✔</button>
          <button onclick="editTask(${index})">✏️</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      `;
      taskList.appendChild(li);
    });

  renderDashboard();
  renderCalendar();
}

function renderDashboard() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const active = total - completed;
  const low = tasks.filter(t => t.priority === "low").length;
  const med = tasks.filter(t => t.priority === "medium").length;
  const high = tasks.filter(t => t.priority === "high").length;

  document.getElementById("dashboard").innerHTML = `
    📊 <strong>Total:</strong> ${total} |
    ✅ Completed: ${completed} |
    🔄 Active: ${active} <br>
    🔥 Priority - 🟢 Low: ${low} | 🟡 Medium: ${med} | 🔴 High: ${high}
  `;
}

function renderCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "<h3>📅 Tasks by Date</h3>";

  const dates = {};

  tasks.forEach(task => {
    if (!task.date) return;
    if (!dates[task.date]) dates[task.date] = [];
    dates[task.date].push(task.text);
  });

  for (let date in dates) {
    const section = document.createElement("div");
    section.className = "calendar-date";
    section.innerHTML = `<strong>${date}</strong><ul>${dates[date]
      .map(t => `<li>${t}</li>`)
      .join("")}</ul>`;
    calendar.appendChild(section);
  }
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    text,
    date: dueDate.value,
    priority: priority.value,
    repeat: repeat.value,
    done: false
  });

  taskInput.value = "";
  dueDate.value = "";
  priority.value = "low";
  repeat.value = "none";
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].done = !tasks[index].done;
  handleRecurring(index);
  saveTasks();
  renderTasks();
}

function handleRecurring(index) {
  const task = tasks[index];
  if (!task.done || task.repeat === "none") return;

  const nextDate = new Date(task.date);
  if (task.repeat === "daily") nextDate.setDate(nextDate.getDate() + 1);
  if (task.repeat === "weekly") nextDate.setDate(nextDate.getDate() + 7);

  tasks.push({
    text: task.text,
    date: nextDate.toISOString().split("T")[0],
    priority: task.priority,
    repeat: task.repeat,
    done: false
  });
}

function editTask(index) {
  const updatedText = prompt("Edit task:", tasks[index].text);
  if (updatedText?.trim()) {
    tasks[index].text = updatedText.trim();
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

function exportTasks() {
  const blob = new Blob([JSON.stringify(tasks)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tasks.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importTasks() {
  const file = importFile.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      tasks = JSON.parse(e.target.result);
      saveTasks();
      renderTasks();
    } catch {
      alert("Invalid file!");
    }
  };
  reader.readAsText(file);
}

// 🔃 Drag & Drop
let draggedIndex = null;

function dragStart(e) {
  draggedIndex = +e.currentTarget.dataset.index;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  const targetIndex = +e.currentTarget.dataset.index;
  const [draggedTask] = tasks.splice(draggedIndex, 1);
  tasks.splice(targetIndex, 0, draggedTask);
  saveTasks();
  renderTasks();
}

// 🎤 Voice Input
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  voiceBtn.addEventListener('click', () => {
    recognition.start();
  });

  recognition.onresult = function (e) {
    const transcript = e.results[0][0].transcript;
    taskInput.value = transcript;
  };
}

addBtn.addEventListener("click", addTask);
renderTasks();
