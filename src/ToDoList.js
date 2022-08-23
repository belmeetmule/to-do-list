import taskStatus from './taskStatusUpdate.js';

const tasksSection = document.querySelector('.tasks-container');
const inputBox = document.querySelector('.input-box');

class ToDoList {
  constructor() {
    this.tasksList = [];
  }

    static getLocalList = () => {
      let temp = [];
      temp = localStorage.getItem('my-to-do-list');

      if (temp) {
        temp = JSON.parse(temp);
        this.tasksList = temp;
      } else {
        localStorage.setItem('my-to-do-list', JSON.stringify(this.tasksList));
      }

      return this.tasksList;
    }

    static updateLocalList = (data) => {
      localStorage.setItem('my-to-do-list', JSON.stringify(data));
    }

    static deleteTask = (target) => {
      let desc = '';
      desc = target.parentElement.firstElementChild.lastElementChild.textContent;
      let localData = ToDoList.getLocalList();
      localData.forEach((item, index) => {
        if ((((item.description).trim().toString()) === (desc.trim().toString()))) {
          localData.splice(index, 1);
          ToDoList.updateLocalList(localData);
        }
      });

      // re-arrange index after delete
      localData = ToDoList.getLocalList();
      if (localData.length !== 0) {
        for (let i = 0; i < localData.length; i += 1) { localData[i].index = i; }
      }
      // update the local storage
      ToDoList.updateLocalList(localData);

      // remove the item from the UI
      target.parentElement.remove();
    }

    static clearAllTasks = () => {
      const localData = ToDoList.getLocalList();
      const completedTasks = localData.filter((task) => task.completed === true);
      if (completedTasks.length !== 0) {
        const allTasks = document.querySelectorAll('.tasks');
        for (let i = 0; i < allTasks.length; i += 1) {
          if (localData[i].completed === true) {
            ToDoList.deleteTask(allTasks[i].lastElementChild);
          }
        }
      }
    }

    static editTask = (taskElement, todo) => {
      const editField = document.createElement('input');
      editField.type = Text;
      editField.className = 'edit-input';
      editField.value = todo.textContent;
      taskElement.replaceChild(editField, todo);
      taskElement.parentElement.classList.add('task-bg');

      editField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const tasks = document.querySelectorAll('.tasks');
          const localData = ToDoList.getLocalList();
          for (let i = 0; i < tasks.length; i += 1) {
            if (tasks[i].classList.contains('task-bg')) {
              localData[i].description = editField.value;
              ToDoList.updateLocalList(localData);
            }
          }
          window.location.reload();
          editField.parentElement.parentElement.classList.remove('task-bg');
          taskElement.replaceChild(todo, editField);
          todo.textContent = editField.value;
        }
      });
    }

    static selectTasks = (cb) => {
      console.log(cb.nextElementSibling.textContent);
      if (cb.checked) {
        cb.parentElement.parentElement.classList.add('task-bg');
        cb.nextElementSibling.classList.add('task-completed');
        cb.parentElement.parentElement.lastElementChild.classList.add('delete-task-icon');
        cb.parentElement.parentElement.lastElementChild.previousElementSibling.classList.add('edit-task-icon');

        // milestone 3
        taskStatus(cb);
      } else {
        cb.parentElement.parentElement.classList.remove('task-bg');
        cb.nextElementSibling.classList.remove('task-completed');
        cb.parentElement.parentElement.lastElementChild.classList.remove('delete-task-icon');
        cb.parentElement.parentElement.lastElementChild.previousElementSibling.classList.remove('edit-task-icon');

        // milestone 3
        taskStatus(cb);
      }

      // now target the associated delete icon with this cb
      const delButton = cb.parentElement.parentElement.lastElementChild;
      delButton.addEventListener('click', () => {
        ToDoList.deleteTask(delButton);
      });
    };

    addToDo = (task) => {
      const taskElement = document.createElement('div');
      taskElement.className = 'tasks';
      taskElement.innerHTML = `
      <div class="task-wrapper">
      <input type="checkbox" name="completed" class="status">
      <span> ${task} </span>
      
      </div>
      <i class="fas fa-ellipsis-v"></i>
      <i class="fas fa-trash-alt"></i>
      `;
      tasksSection.appendChild(taskElement);
    }
}

export { ToDoList, inputBox };