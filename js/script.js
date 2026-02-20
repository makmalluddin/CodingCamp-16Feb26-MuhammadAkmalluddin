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
  row.className = "hover:bg-white/10 transition";

  row.innerHTML = `
    <td class="py-4">${task}</td>
    <td>${date}</td>
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
      <td colspan="3" class="text-center py-6 text-white/50">
        No task yet
      </td>
    `;
    table.appendChild(row);
  }
}