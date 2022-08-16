import './style.css';

const tasksSection = document.querySelector('.tasks-container');

const tasksList = [
  {
    task: 'task 1',
    completed: 'false',
    index: 0,
  },
  {
    task: 'task 2',
    completed: 'false',
    index: 1,
  },
  {
    task: 'task 3',
    completed: 'false',
    index: 2,
  },
];

function component(task) {
  const taskElement = document.createElement('div');
  taskElement.className = 'tasks';
  taskElement.innerHTML = `
  <div class="task-wrapper">
  <input type="checkbox" name="completed" class="completed">
  <span>${task} </span>
  </div>
  <i class="fas fa-ellipsis-v"></i>
  <i class="fas fa-trash-alt"></i>
  `;
  tasksSection.appendChild(taskElement);
}
tasksList.forEach((taskItem) => {
  component(taskItem.task);
});
