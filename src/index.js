import Task from './Task.js';
import './style.css';

const tasksSection = document.querySelector('.tasks-container');
const inputBox = document.querySelector('.input-box');

class ToDoList {
  constructor() {
    this.tasksList = [];
  }

  static getLocalList = () => {
    const temp = localStorage.getItem('my-to-do-list');

    if (temp) {
      this.tasksList = JSON.parse(temp);
    } else {
      localStorage.setItem('my-to-do-list', JSON.stringify(this.tasksList));
    }

    return this.tasksList;
  }

  static updateLocalList = (data) => {
    localStorage.setItem('my-to-do-list', JSON.stringify(data));
  }

  static clearAll = () => {
    // let temp = 0;
    // temp = this.tasksList.filter((task) => task.completed === false);
    const completedTasks = this.tasksList.filter((task) => task.completed === true);
    const allTasks = document.querySelectorAll('.tasks');
    if (completedTasks.length !== 0) {
      for (let i = 0; i < allTasks.length; i += 1) {
        if (this.tasksList[i].completed === true) {
          document.querySelector('.tasks-container').removeChild(allTasks[i]);
        }
      }
      this.tasksList = this.tasksList.filter((task) => task.completed === false);
      ToDoList.updateLocalList(this.tasksList);
    }
    // re-arrange index after delete
    if (this.tasksList.length !== 0) {
      for (let i = 0; i < this.tasksList.length; i += 1) { this.tasksList[i].index = i; }
    }
    // update the local storage
    ToDoList.updateLocalList(this.tasksList);
  }

  static deleteTask = (target) => {
    const temp = [];
    let desc = '';
    desc = target.parentElement.firstElementChild.lastElementChild.textContent;
    this.tasksList = ToDoList.getLocalList();
    console.log(`temp${temp}`);

    this.tasksList.forEach((item, index) => {
      if ((((item.description).trim().toString()) === (desc.trim().toString()))) {
        this.tasksList.splice(index, 1);
        console.log(`after delete ${temp}`);
        ToDoList.updateLocalList(this.tasksList);
      }
    });

    // re-arrange index after delete
    this.tasksList = ToDoList.getLocalList();
    if (this.tasksList.length !== 0) {
      for (let i = 0; i < this.tasksList.length; i += 1) { this.tasksList[i].index = i; }
    }
    // update the local storage
    ToDoList.updateLocalList(this.tasksList);

    // remove the item from the UI
    target.parentElement.remove();
  }

  addToDo = (task) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'tasks';
    taskElement.innerHTML = `
    <div class="task-wrapper">
    <input type="checkbox" name="completed" class="status">
    <span>${task} </span>
    </div>
    <i class="fas fa-ellipsis-v"></i>
    <i class="fas fa-trash-alt"></i>
    `;
    tasksSection.appendChild(taskElement);

    const checkBoxes = document.querySelectorAll('.status');
    checkBoxes.forEach((cb) => {
      cb.addEventListener('click', () => {
        console.log(cb.nextElementSibling.textContent);

        cb.parentElement.parentElement.classList.toggle('task-bg');
        // cb.parentElement.lastElementChild.classList.toggle('task-completed');
        cb.nextElementSibling.classList.toggle('task-completed');
        cb.parentElement.parentElement.lastElementChild.classList.toggle('delete-task-icon');
        cb.parentElement.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-task-icon');

        // change status of the completed status
        for (let i = 0; i < this.tasksList.length; i += 1) {
          const cbTemp = cb.parentElement.lastElementChild.innerHTML;
          if ((this.tasksList[i].description.trim().toString()) === ((cbTemp).trim().toString())) {
            this.tasksList[i].completed = !(this.tasksList[i].completed);
            ToDoList.updateLocalList(this.tasksList);
          }
        }
        /*

        (this.tasksList).forEach(task =>{
          const cbTemp = cb.parentElement.lastElementChild.innerHTML;
        if ((((task.description).trim().toString()) === ((cbTemp).trim().toString()))){
          task.completed = !(task.completed);
          this.updateLocalList(this.tasksList);
        }
      }); */
      });
    });

    // find the delete icons here
    const deleteIcons = document.querySelectorAll('.fa-trash-alt');
    deleteIcons.forEach((di) => {
      di.addEventListener('click', (e) => {
        ToDoList.deleteTask(e.target);
      });
    });
  }
}

const myList = new ToDoList();

const refresh = () => {
  myList.tasksList = ToDoList.getLocalList();
  myList.tasksList.forEach((task) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'tasks';
    taskElement.innerHTML = `
  <div class="task-wrapper">
  <input type="checkbox" name="completed" class="status">
  <span>${task.description} </span>
  </div>
  <i class="fas fa-ellipsis-v"></i>
  <i class="fas fa-trash-alt"></i>
  `;
    tasksSection.appendChild(taskElement);

    const checkBoxes = document.querySelectorAll('.status');

    checkBoxes.forEach((cb) => {
      cb.addEventListener('click', (e) => {
        console.log(e.target.nextElementSibling.textContent);
        cb.parentElement.parentElement.classList.toggle('task-bg');
        // cb.parentElement.lastElementChild.classList.toggle('task-completed');
        cb.nextElementSibling.classList.toggle('task-completed');
        cb.parentElement.parentElement.lastElementChild.classList.toggle('delete-task-icon');
        cb.parentElement.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-task-icon');

        for (let i = 0; i < myList.tasksList.length; i += 1) {
          const cbTemp = cb.parentElement.lastElementChild.innerHTML;
          if ((myList.tasksList[i].description.trim().toString()) === (cbTemp.trim().toString())) {
            myList.tasksList[i].completed = !(myList.tasksList[i].completed);
            ToDoList.updateLocalList(myList.tasksList);
          }
        }
        /*

        (myList.tasksList).forEach(task =>{
           const cbTemp = cb.parentElement.lastElementChild.innerHTML;
      if ((((task.description).trim().toString()) === ((cbTemp).trim().toString()))){
        task.completed = !(task.completed);
        ToDoList.updateLocalList(myList.tasksList);
      }
     }); */
      });
    });

    // find the delete icons here
    const deleteIcons = document.querySelectorAll('.fa-trash-alt');
    deleteIcons.forEach((di) => {
      di.addEventListener('click', (e) => {
        ToDoList.deleteTask(e.target);
      });
    });
  });
};

const clearUI = () => {
  const allTasks = document.querySelectorAll('.tasks');
  if (allTasks.length !== 0) {
    for (let i = 0; i < allTasks.length; i += 1) {
      document.querySelector('.tasks-container').removeChild(allTasks[i]);
    }
    refresh();
  }
};

inputBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputBox.value) {
    myList.addToDo(inputBox.value);
    const toDo = new Task(inputBox.value, false, myList.tasksList.length);
    myList.tasksList = ToDoList.getLocalList();
    myList.tasksList.push(toDo);
    ToDoList.updateLocalList(myList.tasksList);
    inputBox.value = null;
    e.preventDefault();
  }
});

// clear all button
const clearAllBtn = document.querySelector('button');
clearAllBtn.addEventListener('click', () => {
  ToDoList.clearAll();
  clearUI();
});

window.onload = () => {
  refresh();
};
