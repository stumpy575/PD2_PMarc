window.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskInput  = document.getElementById("taskInput");
    const taskList   = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    displayTasks();

    function addTask() {
        const text = taskInput.value.trim();
        if (text === "") {
            alert("Please enter text before adding a task.");
            return;
        }
        tasks.push({ text, completed: false });
        saveTasks();
        displayTasks();
        taskInput.value = "";
        taskInput.focus();
    }

    function displayTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const row = document.createElement("li");
            row.classList.add("task-row");

            const title = document.createElement("span");
            title.textContent = task.text;
            title.classList.add("task-title");

            const actions = document.createElement("div");
            actions.classList.add("task-controls");

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.classList.add("modify-btn");
            editBtn.addEventListener("click", () => modifyTask(index));

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("remove-btn");
            deleteBtn.addEventListener("click", () => removeTask(index));

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            row.appendChild(title);
            row.appendChild(actions);
            taskList.appendChild(row);
        });
    }

    function modifyTask(index) {
        const updated = prompt("Edit task:", tasks[index].text);
        if (updated !== null && updated.trim() !== "") {
            tasks[index].text = updated.trim();
            saveTasks();
            displayTasks();
        }
    }

    function removeTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addTask();
    });
});