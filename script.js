let tasks = [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const errorMessage = document.getElementById("errorMessage");
const clearBtn = document.getElementById("clearBtn");
const filterButtons = document.querySelectorAll(".filter-btn");
const emptyMessage = document.getElementById("emptyMessage");

// Add Task
addBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        errorMessage.textContent = "Please enter a task!";
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    taskInput.value = "";
    errorMessage.textContent = "";
    displayTasks();
});

// Add task when pressing Enter
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addBtn.click();
    }
});

// Display Tasks
function displayTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(function (task) {
        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center";

        const leftSide = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input me-2";
        checkbox.checked = task.completed;

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            displayTasks();
        });

        leftSide.appendChild(checkbox);
        leftSide.appendChild(taskText);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn btn-danger btn-sm";

        deleteBtn.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item !== task;
            });

            displayTasks();
        });

        li.appendChild(leftSide);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    const remaining = tasks.filter(function (task) {
        return !task.completed;
    }).length;

    taskCounter.textContent = remaining + " remaining";

    emptyMessage.style.display =
        filteredTasks.length === 0 ? "block" : "none";
}

// Filter Tasks
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-outline-primary");
        });

        button.classList.remove("btn-outline-primary");
        button.classList.add("btn-primary");

        displayTasks();
    });
});

// Clear Completed Tasks
clearBtn.addEventListener("click", function () {
    tasks = tasks.filter(function (task) {
        return !task.completed;
    });

    displayTasks();
});

displayTasks();