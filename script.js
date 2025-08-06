const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const tabButtons = document.querySelectorAll('.tab');
let currentTab = 'today';

let tasks = [
  {
    id: 1,
    title: 'Draft Project Proposal',
    date: new Date().toDateString(),
    priority: 'high',
    completed: false
  },
  {
    id: 2,
    title: 'Take Trash Out',
    date: new Date().toDateString(),
    priority: 'medium',
    completed: false
  }
];

function renderTasks() {
  taskList.innerHTML = '';
  const today = new Date().toDateString();
  tasks.forEach(task => {
    if (
      (currentTab === 'today' && task.date === today) ||
      (currentTab === 'pending' && !task.completed && task.date !== today) ||
      (currentTab === 'overdue' && task.date < today && !task.completed)
    ) {
      const li = document.createElement('li');
      li.className = 'task-item';

      li.innerHTML = `
        <div class="task-left">
          <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})" />
          <div class="task-title ${task.completed ? 'completed' : ''}">${task.title}</div>
        </div>
        <div class="task-right">
          <div class="task-date">⏰ ${task.date}</div>
          <div class="priority-pill ${task.priority === 'high' ? 'priority-red' : 'priority-yellow'}"></div>
          <button class="icon-btn" onclick="editTask(${task.id})">✏️</button>
          <button class="icon-btn" onclick="deleteTask(${task.id})">🗑️</button>
        </div>
      `;
      taskList.appendChild(li);
    }
  });
}

function addTask() {
  const title = prompt("Enter task title:");
  if (!title) return;
  const priority = prompt("Enter priority: high or medium").toLowerCase();
  const task = {
    id: Date.now(),
    title,
    date: new Date().toDateString(),
    priority: priority === 'high' ? 'high' : 'medium',
    completed: false
  };
  tasks.push(task);
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newTitle = prompt("Edit task title:", task.title);
  if (newTitle) {
    task.title = newTitle;
    renderTasks();
  }
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  renderTasks();
}

addTaskBtn.addEventListener('click', addTask);

tabButtons.forEach(tab => {
  tab.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tab.classList.add('active');
    currentTab = tab.getAttribute('data-tab');
    renderTasks();
  });
});

renderTasks();
