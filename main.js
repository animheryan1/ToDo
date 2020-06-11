const STORAGE_KEY = "todo-app";
let presentTasks = [
    {
        "name": "Wake up",
        "done": true
    },
    {
        "name": "Learn JS",
        "done": false
    },
    {
        "name": "Sleep",
        "done": true
    }
];

function fetchTask() {
    presentTasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || presentTasks;
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    presentTasks.forEach((task, i) => {
        let taskHTML = `<li class="to-do-item" id="task-${i}"><input type="checkbox" onclick="toggleDone(${i})" class="hidden-checkbox"`;
        if (task.done) {
            taskHTML += `checked`;
        }
        taskHTML += `><label>${task.name}</label><button class="delete-button" onclick="deleteTask(${i})"></button></li>`;
        taskList.innerHTML += taskHTML;
    })
}

function deleteTask(index) {
    document.getElementById("task-" + index).style.display = "none";
    let taskName = document.querySelector("#task-" + index + " label").textContent;
    presentTasks = presentTasks.filter(task => task.name !== taskName);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presentTasks));
}

function addTask() {
    const inputValue = document.getElementById("task-input").value;
    if (!inputValue.trim()) {
        return;
    }
    const taskHTML = `<li class="to-do-item" id="task-${presentTasks.length}"><input type="checkbox" onclick="toggleDone(${presentTasks.length})" class="hidden-checkbox"><label>${inputValue}</label><button class="delete-button" onclick="deleteTask(${presentTasks.length})"></button></li>`
    document.getElementById("task-list").innerHTML += taskHTML;
    presentTasks.push({
        "name": inputValue,
        "done": false
    });
    document.getElementById("task-input").value = "";
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presentTasks));
}

const input = document.getElementById("task-input");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTask();
    }
});

function toggleDone(index) {
    presentTasks[index].done = !presentTasks[index].done;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presentTasks));
}

function markAllComplete() {
    presentTasks.forEach((task, i) => {
        document.querySelector("#task-" + i + " .hidden-checkbox").checked = true;
        task.done = true;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presentTasks));
}

function showUncompleted() {
    let taskNodes = document.getElementById("task-list").childNodes;
    for (let task of taskNodes) {
        if (task.firstChild.checked) {
            task.style.display = "none";
        }
    }
}