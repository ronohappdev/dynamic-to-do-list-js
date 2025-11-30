// Run script after HTML is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // ------------------------------
    // Select DOM Elements
    // ------------------------------
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // In-memory tasks array
    let tasks = [];

    // ------------------------------
    // Save tasks to Local Storage
    // ------------------------------
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // ------------------------------
    // Load tasks from Local Storage
    // ------------------------------
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks = storedTasks;

        // Create each saved task in DOM
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // ------------------------------
    // Create task <li> element in DOM
    // ------------------------------
    function createTaskElement(taskText) {
        const li = document.createElement("li");

        // Set text content
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn"; // STILL allowed, NOT classList.add

        // Required: use onclick to remove
        removeBtn.onclick = function () {
            taskList.removeChild(li);

            // Remove from array
            tasks = tasks.filter(text => text !== taskText);

            // Save updated tasks
            saveTasks();
        };

        // Append button and task
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // ------------------------------
    // addTask Function
    // ------------------------------
    function addTask() {
        const taskText = taskInput.value.trim(); // REQUIRED

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Add to array
        tasks.push(taskText);

        // Save to storage
        saveTasks();

        // Create in DOM
        createTaskElement(taskText);

        // Clear input
        taskInput.value = "";
    }

    // ------------------------------
    // Event Listeners
    // ------------------------------
    addButton.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load tasks on startup
    loadTasks();
});
