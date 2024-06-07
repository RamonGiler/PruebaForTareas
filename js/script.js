document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    document.getElementById('taskForm').addEventListener('submit', addTask);
    document.getElementById('searchInput').addEventListener('input', searchTasks);
});

// Añadir tarea al localStorage y actualizar la tabla
function addTask(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    // Crear objeto de tarea
    const task = {
        title,
        description,
        dueDate,
        priority,
        status: 'Pendiente'
    };

    // Guardar en localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Resetear formulario
    document.getElementById('taskForm').reset();

    // Actualizar tabla
    loadTasks();
}

// Cargar y mostrar tareas en la tabla
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksTable = document.querySelector('#tasksTable tbody');
    tasksTable.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.dueDate}</td>
            <td>${task.priority}</td>
            <td class="${task.status === 'Completada' ? 'completed' : ''}">${task.status}</td>
            <td>
                <button onclick="toggleStatus(${index})">${task.status === 'Pendiente' ? 'Marcar como Completada' : 'Marcar como Pendiente'}</button>
                <button onclick="deleteTask(${index})">Eliminar</button>
            </td>
        `;
        tasksTable.appendChild(row);
    });
}

// Marcar tarea como completada o pendiente
function toggleStatus(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].status = tasks[index].status === 'Pendiente' ? 'Completada' : 'Pendiente';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Eliminar tarea de la lista
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

