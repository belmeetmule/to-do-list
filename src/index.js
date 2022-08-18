import Task from './Task.js';
import './style.css';
import { map, trim } from 'lodash';

const tasksSection = document.querySelector('.tasks-container');
const inputBox = document.querySelector('.input-box');

const tasksList = [];

class ToDoList{
  constructor(){
    this.tasksList = [];
  }

  getLocalList = () => {
    let temp = localStorage.getItem('my-to-do-list');
    
    if(temp){
      myList.tasksList = JSON.parse(temp);
    }else{
      localStorage.setItem('my-to-do-list', JSON.stringify(myList.tasksList));
    }

    return myList.tasksList;
  }

  updateLocalList = (data) =>{
    localStorage.setItem('my-to-do-list', JSON.stringify(data));
  }

  static clearAll = () =>{
    let temp = 0;
    temp = myList.tasksList.filter(task => task.completed === false);
    let completedTasks = myList.tasksList.filter(task => task.completed === true);
    const allTasks = document.querySelectorAll('.tasks')
    if(completedTasks.length !==0){
      console.log('the list after filter' + myList.tasksList);
      for(let i = 0; i < allTasks.length; i++){
        if( myList.tasksList[i].completed === true){
          document.querySelector('.tasks-container').removeChild(allTasks[i]);
        }
     }
     myList.tasksList = myList.tasksList.filter(task => task.completed === false);
     myList.updateLocalList(myList.tasksList);
    }
    //re-arrange index after delete
    if(myList.tasksList.length !==0){
      for(let i = 0; i < myList.tasksList.length; i++)
      myList.tasksList[i].index = i;
    }
    //update the local storage
    myList.updateLocalList(myList.tasksList);
    
  }

  static deleteTask = (target) =>{
    let temp = [];
    let desc = '';
    desc=target.parentElement.firstElementChild.lastElementChild.textContent;
     temp = myList.getLocalList();
     console.log('temp'+ temp);
     
    temp.forEach((item, index) => {
      if ((((item.description).trim().toString()) === (desc.trim().toString()))) {

        temp.splice(index, 1);
        console.log('after delete ' +  temp);
        myList.updateLocalList(temp);
      }
    });

    //re-arrange index after delete
    if(myList.tasksList.length !==0){
      for(let i = 0; i < myList.tasksList.length; i++)
      myList.tasksList[i].index = i;
    }
    //update the local storage
    myList.updateLocalList(myList.tasksList);

    //remove the item from the UI
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

  /*   const checkBoxes = document.querySelectorAll('.status');
    checkBoxes.forEach(cb => {
      cb.addEventListener('change', () =>{

        cb.parentElement.parentElement.classList.toggle('task-bg');
        //cb.parentElement.lastElementChild.classList.toggle('task-completed');
        cb.nextElementSibling.classList.toggle('task-completed');
        cb.parentElement.parentElement.lastElementChild.classList.toggle('delete-task-icon');
        cb.parentElement.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-task-icon');
        
       // change status of the completed status
       for(let i=0; i<checkBoxes.length; i = i +1){
        if((myList.tasksList[i].description.trim().toString()) === ((cb.parentElement.lastElementChild.innerHTML).trim().toString())){
          myList.tasksList[i].completed= !(myList.tasksList[i].completed);
          myList.updateLocalList(myList.tasksList);
       }
      }
       /* (myList.tasksList).forEach(task =>{
        if ((((task.description).trim().toString()) === ((cb.parentElement.lastElementChild.innerHTML).trim().toString()))){
          task.completed = !(task.completed); 
          myList.updateLocalList(myList.tasksList);
        }
       }); */
           
    /* })
    }
    ); */ 

    // find the delete icons here
    const deleteIcons = document.querySelectorAll('.fa-trash-alt');
    deleteIcons.forEach(di => {
      di.addEventListener('click', (e) =>{
        ToDoList.deleteTask(e.target);
      })
    })

  }
}


let myList = new ToDoList();

inputBox.addEventListener('keypress', (e) =>{
  if( e.key === 'Enter' && inputBox.value){
    myList.addToDo(inputBox.value);
    let toDo = new Task(inputBox.value, false, myList.tasksList.length);
    myList.tasksList = myList.getLocalList();
    myList.tasksList.push(toDo);
    myList.updateLocalList(myList.tasksList);
    inputBox.value = null;
    e.preventDefault();

    const checkBoxes = document.querySelectorAll('.status');
  console.log('checkboxes' + checkBoxes.length);
  checkBoxes.forEach(cb => {
    cb.addEventListener('change', () =>{

      cb.parentElement.parentElement.classList.toggle('task-bg');
      //cb.parentElement.lastElementChild.classList.toggle('task-completed');
      cb.nextElementSibling.classList.toggle('task-completed');
      cb.parentElement.parentElement.lastElementChild.classList.toggle('delete-task-icon');
      cb.parentElement.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-task-icon');
      
     // change status of the completed status
     for(let i=0; i<myList.tasksList.length; i = i +1){
      if((myList.tasksList[i].description.trim().toString()) === ((cb.parentElement.lastElementChild.innerHTML).trim().toString())){
        myList.tasksList[i].completed= !(myList.tasksList[i].completed);
        myList.updateLocalList(myList.tasksList);
     }
    }
     /* (myList.tasksList).forEach(task =>{
      if ((((task.description).trim().toString()) === ((cb.parentElement.lastElementChild.innerHTML).trim().toString()))){
        task.completed = !(task.completed); 
        myList.updateLocalList(myList.tasksList);
      }
     }); */

  })
  }
  );
  }
    
})

// clear all button
const clearAllBtn = document.querySelector('button');
console.log('clear all target' + clearAllBtn);
clearAllBtn.addEventListener('click', ()=>{
  ToDoList.clearAll();
  console.log('function caller' + clearAllBtn);
});

const refresh = () => {
  myList.tasksList= myList.getLocalList();
  myList.tasksList.forEach(task => {
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
  console.log('checkboxes' + checkBoxes.length);
  checkBoxes.forEach(cb => {
    cb.addEventListener('change', () =>{

      cb.parentElement.parentElement.classList.toggle('task-bg');
      //cb.parentElement.lastElementChild.classList.toggle('task-completed');
      cb.nextElementSibling.classList.toggle('task-completed');
      cb.parentElement.parentElement.lastElementChild.classList.toggle('delete-task-icon');
      cb.parentElement.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-task-icon');
      
     // change status of the completed status
     for(let i=0; i<myList.tasksList.length; i = i +1){
      if((myList.tasksList[i].description.trim().toString()) === ((cb.parentElement.lastElementChild.innerHTML).trim().toString())){
        myList.tasksList[i].completed= !(myList.tasksList[i].completed);
        myList.updateLocalList(myList.tasksList);
     }
    }
     /* (myList.tasksList).forEach(task =>{
      if ((((task.description).trim().toString()) === ((cb.parentElement.lastElementChild.innerHTML).trim().toString()))){
        task.completed = !(task.completed); 
        myList.updateLocalList(myList.tasksList);
      }
     }); */

  })
  }
  );

  // find the delete icons here
  const deleteIcons = document.querySelectorAll('.fa-trash-alt');
  deleteIcons.forEach(di => {
    di.addEventListener('click', (e) =>{
      ToDoList.deleteTask(e.target);
    })
  })

  });
}

 window.onload = () => {
  refresh();
};

