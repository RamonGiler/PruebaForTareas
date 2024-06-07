document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    document.getElementById('taskForm').addEventListener('submit', addTask);
    document.getElementById('searchInput').addEventListener('input', searchTasks);
});
    // Obtener valores del formulario
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
// Añadir tarea al localStorage y actualizar la tabla
function addTask(e) {
    e.preventDefault();
    
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

