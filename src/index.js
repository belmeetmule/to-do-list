import Task from './Task.js';
import './style.css';

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
      // cb.parentElement.lastElementChild.classList.toggle('task-completed');
      cb.nextElementSibling.classList.add('task-completed');
      cb.parentElement.parentElement.lastElementChild.classList.add('delete-task-icon');
      cb.parentElement.parentElement.lastElementChild.previousElementSibling.classList.add('edit-task-icon');
    } else {
      cb.parentElement.parentElement.classList.remove('task-bg');
      // cb.parentElement.lastElementChild.classList.toggle('task-completed');
      cb.nextElementSibling.classList.remove('task-completed');
      cb.parentElement.parentElement.lastElementChild.classList.remove('delete-task-icon');
      cb.parentElement.parentElement.lastElementChild.previousElementSibling.classList.remove('edit-task-icon');
    }
    // milestone 3
    const tempList = ToDoList.getLocalList();
    for (let i = 0; i < tempList.length; i += 1) {
      const cbTemp = cb.parentElement.lastElementChild.innerHTML;
      if ((tempList[i].description.trim().toString()) === (cbTemp.trim().toString())) {
        tempList[i].completed = !(tempList[i].completed);
        ToDoList.updateLocalList(tempList);
      }
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
    // <span contenteditable="true"> ${task} </span>
  }
}

const myList = new ToDoList();

const refresh = () => {
  myList.tasksList = ToDoList.getLocalList();
  myList.tasksList.forEach((task) => {
    // build the list from local store
    myList.addToDo(task.description);

    // check boxes
    const checkBoxes = document.querySelectorAll('.status');
    checkBoxes.forEach((cb) => cb.addEventListener('change', () => {
      ToDoList.selectTasks(cb);
    }));

    // find the delete icons here
    const deleteIcons = document.querySelectorAll('.fa-trash-alt');
    deleteIcons.forEach((di) => di.addEventListener('click', (e) => {
      ToDoList.deleteTask(e.target);
      window.location.reload();
    }));
  });
};

inputBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputBox.value) {
    myList.addToDo(inputBox.value);

    const toDo = new Task(inputBox.value, false, myList.tasksList.length);
    if (myList.tasksList === null) {
      myList.tasksList = [];
    }
    myList.tasksList.push(toDo);
    ToDoList.updateLocalList(myList.tasksList);
    inputBox.value = null;

    // edit tasks or icons
    const editIcons = document.querySelectorAll('.fa-ellipsis-v');
    editIcons.forEach((i) => i.addEventListener('click', () => {
      ToDoList.editTask(i.previousElementSibling, i.previousElementSibling.lastElementChild);
    }));

    // check boxes
    const checkBoxes = document.querySelectorAll('.status');
    checkBoxes.forEach((cb) => cb.addEventListener('change', () => {
      ToDoList.selectTasks(cb);
    }));

    // delete icons here
    const deleteIcons = document.querySelectorAll('.fa-trash-alt');
    deleteIcons.forEach((di) => di.addEventListener('click', (e) => {
      ToDoList.deleteTask(e.target);
    }));
    window.location.reload();
    e.preventDefault();
  }
});

window.onload = () => {
  const temp = localStorage.getItem('my-to-do-list');
  console.log(temp);
  if (temp) {
    myList.tasksList = JSON.parse(temp);
  } else {
    localStorage.setItem('my-to-do-list', JSON.stringify(myList.tasksList));
  }

  refresh();

  // edit tasks or icons
  const editIcons = document.querySelectorAll('.fa-ellipsis-v');
  editIcons.forEach((i) => i.addEventListener('click', () => {
    ToDoList.editTask(i.previousElementSibling, i.previousElementSibling.lastElementChild);
  }));
};
