class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.completed = false;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(title, description) {
        const newTask = new Task(title, description);
        this.tasks.push(newTask);
        return newTask;
    }

    deleteTask(task) {
        const index = this.tasks.indexOf(task);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }

    completeTask(task) {
        task.completed = true;
    }
}

const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskManager = new TaskManager();

taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-description").value;

    if (taskTitle.trim() === "") {
        alert("El título de la tarea no puede estar vacío.");
        return;
    }

    const newTask = taskManager.addTask(taskTitle, taskDescription);
    addTaskToDOM(newTask);

    // Limpiar el formulario
    taskForm.reset();
});

function addTaskToDOM(task) {
    const taskItem = document.createElement("div");
    taskItem.className = "bg-white rounded-lg shadow-lg p-4";
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-checkbox h-5 w-5 text-blue-500 mr-2";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
        taskManager.completeTask(task);
        taskItem.classList.toggle("line-through");
    });

    const taskTitle = document.createElement("h3");
    taskTitle.className = "text-x2 font-semibold";
    taskTitle.textContent = task.title;
    
    const taskDescription = document.createElement("p");
    taskDescription.textContent = task.description;

    const deleteButton = document.createElement("button");
    deleteButton.className = "text-red-500 hover:text-red-700";
    deleteButton.textContent = "ELIMINAR";
    deleteButton.addEventListener("click", function () {
        taskManager.deleteTask(task);
        taskItem.remove();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}
const toggleDarkMode = () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

const darkModeButton = document.getElementById('dark-mode-button');
darkModeButton.addEventListener('click', toggleDarkMode);
