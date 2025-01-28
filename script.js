document.addEventListener("DOMContentLoaded", function () {
	// Select DOM elements
	const addButton = document.getElementById("add-task-btn");
	const taskInput = document.getElementById("task-input");
	const taskList = document.getElementById("task-list");

	// Function to load tasks from Local Storage
	function loadTasks() {
    	const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    	storedTasks.forEach((taskText) => addTask(taskText, false)); // 'false' prevents duplicate saving
	}

	// Function to add a new task
	function addTask(taskText, save = true) {
    	// Check if taskText is empty (only for manual input)
    	if (!taskText.trim()) {
        	alert("Please enter a task.");
        	return;
    	}

    	// Create a new list item (li)
    	const taskItem = document.createElement("li");
    	taskItem.textContent = taskText; // Set the task text

    	// Create a remove button for the task
    	const removeButton = document.createElement("button");
    	removeButton.textContent = "Remove";
    	removeButton.className = "remove-btn";

    	// Attach an event to the remove button to delete the task
    	removeButton.onclick = function () {
        	taskList.removeChild(taskItem);
        	removeTaskFromLocalStorage(taskText);
    	};

    	// Append the remove button to the list item
    	taskItem.appendChild(removeButton);

    	// Add the list item to the task list
    	taskList.appendChild(taskItem);

    	// Save task to Local Storage if 'save' is true
    	if (save) {
        	saveTaskToLocalStorage(taskText);
    	}
	}

	// Function to save a task to Local Storage
	function saveTaskToLocalStorage(taskText) {
    	const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    	storedTasks.push(taskText);
    	localStorage.setItem("tasks", JSON.stringify(storedTasks));
	}

	// Function to remove a task from Local Storage
	function removeTaskFromLocalStorage(taskText) {
    	const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    	const updatedTasks = storedTasks.filter((task) => task !== taskText);
    	localStorage.setItem("tasks", JSON.stringify(updatedTasks));
	}

	// Attach event listener to the "Add Task" button
	addButton.addEventListener("click", function () {
    	addTask(taskInput.value);
    	taskInput.value = ""; // Clear the input field
	});

	// Attach event listener to the input field for the 'Enter' key
	taskInput.addEventListener("keypress", function (event) {
    	if (event.key === "Enter") {
        	addTask(taskInput.value);
        	taskInput.value = ""; // Clear the input field
    	}
	});

	// Load tasks from Local Storage on page load
	loadTasks();
});
