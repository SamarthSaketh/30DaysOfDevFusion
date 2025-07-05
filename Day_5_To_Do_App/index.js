const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const repeat = document.getElementById("repeat");
const addBtn = document.getElementById("addBtn");
const themeSwitcher = document.getElementById("themeSwitcher");
const importFile = document.getElementById("importFile");

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

addBtn.addEventListener("click", addTask);

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const lowList = document.getElementById("lowList");
  const mediumList = document.getElementById("mediumList");
  const highList = document.getElementById("highList");

  lowList.innerHTML = "";
  mediumList.innerHTML = "";
  highList.innerHTML = "";

  let counts = { low: 0, medium: 0, high: 0 };

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
      li.dataset.index = index;

      li.addEventListener("dragstart", dragStart);
      li.addEventListener("dragend", dragEnd);

      li.innerHTML = `
        <div>
          <span>${task.text}</span>
          <div class="meta">📅 ${task.date || "No date"} | 🔁 ${task.repeat} | 🔥 ${task.priority}</div>
        </div>
        <div>
          <button class="complete-btn">✔</button>
          <button class="edit-btn">✏️</button>
          <button class="delete-btn">❌</button>
        </div>
      `;

      li.querySelector(".complete-btn").addEventListener("click", () => toggleComplete(index));
      li.querySelector(".edit-btn").addEventListener("click", () => editTask(index));
      li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(index));

      if (task.priority === "low") {
        lowList.appendChild(li);
        counts.low++;
      } else if (task.priority === "medium") {
        mediumList.appendChild(li);
        counts.medium++;
      } else {
        highList.appendChild(li);
        counts.high++;
      }
    });

  document.getElementById("lowCount").textContent = counts.low;
  document.getElementById("mediumCount").textContent = counts.medium;
  document.getElementById("highCount").textContent = counts.high;

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
    <div class="dashboard-card dashboard-total">
      <h4>📊 Total Tasks</h4>
      <p>${total}</p>
    </div>
    <div class="dashboard-card dashboard-complete">
      <h4>✅ Completed</h4>
      <p>${completed}</p>
    </div>
    <div class="dashboard-card dashboard-active">
      <h4>🔄 Active</h4>
      <p>${active}</p>
    </div>
    <div class="dashboard-card dashboard-low">
      <h4>🟢 Low Priority</h4>
      <p>${low}</p>
    </div>
    <div class="dashboard-card dashboard-medium">
      <h4>🟠 Medium Priority</h4>
      <p>${med}</p>
    </div>
    <div class="dashboard-card dashboard-high">
      <h4>🔴 High Priority</h4>
      <p>${high}</p>
    </div>
  `;
}


function renderCalendar() {
  const calendarEl = document.getElementById("calendarView");
  calendarEl.innerHTML = "";

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 400,
    events: tasks
      .filter(t => t.date)
      .map(t => ({
        title: t.text,
        date: t.date,
        backgroundColor: t.done ? "#aaa" : getPriorityColor(t.priority)
      }))
  });

  calendar.render();
}

function getPriorityColor(priority) {
  switch (priority) {
    case "high": return "#f44336";
    case "medium": return "#ff5722";
    case "low": return "#4caf50";
    default: return "#90a4ae";
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

function exportByPriority(level) {
  const filtered = tasks.filter(t => t.priority === level);
  const blob = new Blob([JSON.stringify(filtered)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${level}_tasks.json`;
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

let draggedTaskIndex = null;

function dragStart(e) {
  draggedTaskIndex = e.target.dataset.index;
  e.target.classList.add("dragging");
}

function dragEnd(e) {
  e.target.classList.remove("dragging");
}

function allowDrop(e) {
  e.preventDefault();
}

function drop(e, newPriority) {
  e.preventDefault();
  if (draggedTaskIndex !== null) {
    tasks[draggedTaskIndex].priority = newPriority;
    saveTasks();
    renderTasks();
  }
}

renderTasks();
