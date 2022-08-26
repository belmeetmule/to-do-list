import Task from './Task.js';
import { ToDoList, inputBox } from './ToDoList.js';
import './style.css';

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
    }));
  });

  const clearTasks = document.querySelector('button');
  clearTasks.addEventListener('click', ToDoList.clearAllTasks);
};

inputBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputBox.value) {
    myList.addToDo(inputBox.value);

    const toDo = new Task(inputBox.value, false, myList.tasksList.length);
    if (myList.tasksList === null) {
      myList.tasksList = [];
    }
    myList.tasksList = ToDoList.getLocalList();
    myList.tasksList.push(toDo);
    ToDoList.updateLocalList(myList.tasksList);
    inputBox.value = null;

    // edit tasks or icons
    const editIcons = document.querySelectorAll('.fa-ellipsis-v');
    editIcons.forEach((i) => i.addEventListener('click', () => {
      ToDoList.editTask(i.previousElementSibling, i.previousElementSibling.lastElementChild);
      window.location.reload();
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
