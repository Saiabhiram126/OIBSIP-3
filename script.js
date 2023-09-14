document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('addTask');
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    function addTask(taskText, isCompleted = false) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${taskText}</span>
            <button class="complete">${isCompleted ? 'Undo' : 'Complete'}</button>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        if (isCompleted) {
            completedTasksList.appendChild(listItem);
        } else {
            pendingTasksList.appendChild(listItem);
        }

        // Attach event listeners
        const editButton = listItem.querySelector('.edit');
        const completeButton = listItem.querySelector('.complete');
        const deleteButton = listItem.querySelector('.delete');
        const taskTextSpan = listItem.querySelector('span');

        editButton.addEventListener('click', function () {
            const updatedTaskText = prompt('Edit task:', taskTextSpan.textContent);
            if (updatedTaskText !== null) {
                taskTextSpan.textContent = updatedTaskText;
            }
        });

        completeButton.addEventListener('click', function () {
            if (isCompleted) {
                pendingTasksList.appendChild(listItem);
                isCompleted = false;
                completeButton.textContent = 'Complete';
            } else {
                completedTasksList.appendChild(listItem);
                isCompleted = true;
                completeButton.textContent = 'Undo';
            }
        });

        deleteButton.addEventListener('click', function () {
            listItem.remove();
        });
    }

    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                taskInput.value = '';
            }
        }
    });
});
