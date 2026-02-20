let currentFilter = "all";

function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const dateInput = document.getElementById("dateInput");
  const table = document.getElementById("todoTable");
  const emptyRow = document.getElementById("emptyRow");

  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Task dan tanggal wajib diisi!");
    return;
  }

  if (emptyRow) emptyRow.remove();

  const row = document.createElement("tr");
  row.dataset.status = "uncompleted";
  row.className = "hover:bg-white/10 transition";

  row.innerHTML = `
    <td class="py-4 task-text">${task}</td>
    <td>${date}</td>
    <td>
      <button onclick="toggleStatus(this)"
        class="px-3 py-1 rounded-full text-xs bg-yellow-500 text-black">
        Uncompleted
      </button>
    </td>
    <td class="text-right">
      <button onclick="deleteOne(this)" 
        class="text-red-400 hover:text-red-600 transition">
        ✕
      </button>
    </td>
  `;

  table.appendChild(row);

  todoInput.value = "";
  dateInput.value = "";

  applyFilter();
}

function toggleStatus(button) {
  const row = button.closest("tr");
  const taskText = row.querySelector(".task-text");

  if (row.dataset.status === "uncompleted") {
    row.dataset.status = "completed";
    button.textContent = "Completed";
    button.className = "px-3 py-1 rounded-full text-xs bg-green-500 text-white";
    taskText.classList.add("line-through", "text-white/40");
  } else {
    row.dataset.status = "uncompleted";
    button.textContent = "Uncompleted";
    button.className = "px-3 py-1 rounded-full text-xs bg-yellow-500 text-black";
    taskText.classList.remove("line-through", "text-white/40");
  }

  applyFilter();
}

function deleteOne(button) {
  button.closest("tr").remove();
  checkEmpty();
}

function deleteAll() {
  document.getElementById("todoTable").innerHTML = "";
  checkEmpty();
}

function checkEmpty() {
  const table = document.getElementById("todoTable");

  if (table.children.length === 0) {
    const row = document.createElement("tr");
    row.id = "emptyRow";
    row.innerHTML = `
      <td colspan="4" class="text-center py-6 text-white/50">
        No task yet
      </td>
    `;
    table.appendChild(row);
  }
}

function setFilter(filter, button) {
  currentFilter = filter;

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("bg-indigo-500");
    btn.classList.add("bg-white/20");
  });

  button.classList.remove("bg-white/20");
  button.classList.add("bg-indigo-500");

  applyFilter();
}

function applyFilter() {
  const rows = document.querySelectorAll("#todoTable tr");

  rows.forEach(row => {
    if (row.id === "emptyRow") return;

    if (currentFilter === "all") {
      row.style.display = "";
    } else if (row.dataset.status === currentFilter) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}