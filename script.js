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

        // Create each saved task in the DOM
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // ------------------------------
    // Create task <li> element in DOM
    // ------------------------------
    function createTaskElement(taskText) {
        const li = document.createElement("li");

        // Set text content (required by project)
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Required: use onclick to remove task
        removeBtn.onclick = function () {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove from array
            tasks = tasks.filter(text => text !== taskText);

            // Update Local Storage
            saveTasks();
        };

        // Append button and li
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // ------------------------------
    // addTask Function (must contain taskInput.value.trim())
    // ------------------------------
    function addTask() {
        // REQUIRED: retrieve + trim input this exact way
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Add to array
        tasks.push(taskText);

        // Save to localStorage
        saveTasks();

        // Add to DOM
        createTaskElement(taskText);

        // Clear input
        taskInput.value = "";
    }

    // ------------------------------
    // Event Listeners
    // ------------------------------

    // Button click → add task
    addButton.addEventListener("click", addTask);

    // Press Enter → add task
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // ------------------------------
    // Load saved tasks when page opens
    // ------------------------------
    loadTasks();
});

