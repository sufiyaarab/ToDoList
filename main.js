window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const dateInput = document.querySelector("#due-date");
    const priorityInput = document.querySelector("#priority");
    const list_el = document.querySelector("#tasks");
    const sortButton = document.querySelector("#sort-button");

    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const sortTasksByDate = () => {
        savedTasks.sort((a, b) => {
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            return dateA - dateB;
        });
        updateTaskList();
    };

    const updateTaskList = () => {
        list_el.innerHTML = "";
        savedTasks.forEach(savedTask => {
            const task_el = document.createElement("div");
            task_el.classList.add("task");
            if (savedTask.completed) {
                task_el.classList.add("completed");
            }

            const completeButton = document.createElement("button");
            completeButton.classList.add("complete-button");
            completeButton.innerText = "Complete";
            completeButton.addEventListener('click', () => {
                completeTask(task_el, savedTask);
            });

            const deleteButton = document.createElement("span");
            deleteButton.classList.add("delete-button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener('click', () => {
                savedTasks = savedTasks.filter(task => task !== savedTask);
                updateTaskList();
                localStorage.setItem('tasks', JSON.stringify(savedTasks));
            });

            const task_content_el = document.createElement("div");
            task_content_el.classList.add("content");
            task_content_el.innerHTML = `<strong>Task:</strong> ${savedTask.task}<br><strong>Due Date:</strong> ${savedTask.dueDate}<br><strong>Priority:</strong> ${savedTask.priority}`;

            task_el.appendChild(completeButton);
            task_el.appendChild(deleteButton);
            task_el.appendChild(task_content_el);
            list_el.appendChild(task_el);
        });
    };

    const completeTask = (task_el, task) => {
        task.completed = true;
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        updateTaskList();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value;
        const dueDate = dateInput.value;
        const priority = priorityInput.value;
        if (!task && !dueDate) {
            return; 
        }

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-button");
        completeButton.innerText = "Complete";
        completeButton.addEventListener('click', () => {
            completeTask(task_el, savedTask);
        });

        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete-button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener('click', () => {
            savedTasks = savedTasks.filter(savedTask => savedTask !== task);
            updateTaskList();
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
        });

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");
        task_content_el.innerHTML = `<strong>Task:</strong> ${task}<br><strong>Due Date:</strong> ${dueDate}<br><strong>Priority:</strong> ${priority}`;

        task_el.appendChild(completeButton);
        task_el.appendChild(deleteButton);
        task_el.appendChild(task_content_el);
        list_el.appendChild(task_el);

        savedTasks.push({ task, dueDate, priority, completed: false });
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        input.value = '';
        dateInput.value = '';
    });

    sortButton.addEventListener('click', () => {
        sortTasksByDate();
    });

    updateTaskList();
});
