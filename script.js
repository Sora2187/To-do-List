// Get elements from DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskListElement = document.getElementById('taskList');

// Load tasks from local storage when the page loads
loadTasks();


// Function to add task
function addTask(){
    const taskText = taskInput.value;

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

     // Load existing tasks from local storage
     const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
     taskList.push({ text: taskText }); // Add new task to the list
     localStorage.setItem("tasks", JSON.stringify(taskList)); // Save updated list to local storage
 
     // Clear the input
     taskInput.value = '';
 
     // Load the updated task list
     loadTasks(); 
}

// Load tasks function
function loadTasks() {
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskListElement.innerHTML = ""; // Clear existing tasks
    taskList.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="editTask(${index})">Edit</button>
        `;
        taskListElement.appendChild(li);
    });
    updateTaskCounter(taskList.length); // Update task counter
}

// Delete task function
function deleteTask(index) {
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.splice(index, 1); // Remove the task at the specified index
    localStorage.setItem("tasks", JSON.stringify(taskList)); // Save the updated task list
    loadTasks(); // Reload the tasks
}


// Edit task function
function editTask(index) {
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskText = prompt("Edit your task:", taskList[index].text);
    if (taskText) {
        taskList[index].text = taskText; // Update the task text
        localStorage.setItem("tasks", JSON.stringify(taskList)); // Save the updated list
        loadTasks(); // Reload the tasks
    }
}

// Function to update task counter
function updateTaskCounter(count) {
    document.getElementById("taskCounter").innerText = `Tasks: ${count}`;
}

// Event listener for add task button
addTaskBtn.addEventListener('click', addTask);
