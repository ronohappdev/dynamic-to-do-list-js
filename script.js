document.addEventListener("DOMContentLoaded", function () {
	// Select DOM elements
	const addButton = document.getElementById("add-task-btn");
	const taskInput = document.getElementById("task-input");
	const taskList = document.getElementById("task-list");

	// Function to add a new task
	function addTask() {
    	// Get the trimmed task input value
    	const taskText = taskInput.value.trim();

    	// Check if the input is empty
    	if (taskText === "") {
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
    	};

    	// Append the remove button to the list item
    	taskItem.appendChild(removeButton);

    	// Add the list item to the task list
    	taskList.appendChild(taskItem);

    	// Clear the input field
    	taskInput.value = "";
	}

	// Attach event listener to the "Add Task" button
	addButton.addEventListener("click", addTask);

	// Attach event listener to the input field for the 'Enter' key
	taskInput.addEventListener("keypress", function (event) {
    	if (event.key === "Enter") {
        	addTask();
    	}
	});
});

