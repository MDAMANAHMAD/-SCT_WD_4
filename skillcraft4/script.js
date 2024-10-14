let taskList = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dateTimeInput = document.getElementById("dateTimeInput");

    if (taskInput.value === "" || dateTimeInput.value === "") {
        alert("Please enter a task and a date/time.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput.value,
        dateTime: dateTimeInput.value,
        completed: false
    };

    taskList.push(task);
    taskInput.value = "";
    dateTimeInput.value = "";
    renderTaskList();
}

function renderTaskList() {
    const taskListContainer = document.getElementById("taskList");
    taskListContainer.innerHTML = "";

    taskList.forEach((task) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            <div class="task-info">
                <span>${task.text}</span> <small>${task.dateTime}</small>
            </div>
            <div class="actions">
                <button class="complete" onclick="toggleComplete(${task.id})">
                    ${task.completed ? "Unmark" : "Complete"}
                </button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskListContainer.appendChild(li);
    });
}

function toggleComplete(id) {
    taskList = taskList.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    renderTaskList();
}

function editTask(id) {
    const task = taskList.find(task => task.id === id);
    const newTaskText = prompt("Edit Task:", task.text);
    const newDateTime = prompt("Edit Date and Time:", task.dateTime);

    if (newTaskText !== null && newDateTime !== null) {
        task.text = newTaskText;
        task.dateTime = newDateTime;
        renderTaskList();
    }
}

function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id);
    renderTaskList();
}
