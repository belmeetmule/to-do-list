/**
 * @jest-environment jsdom
 */
/* eslint-disable*/

import { ToDoList } from "./ToDoList";
import {changeTaskStatus} from "./taskStatusUpdate";

describe('Test Add', () => {
    test('Add', () => {
      document.body.innerHTML = '<div class="tasks-container" id="tasks-list"> </div>';
      let task = document.getElementById('tasks-list');
      
      let myList = new ToDoList();
      myList.setReference(task);
      const description = 'test';
    myList.addToDo(description);
    myList.addToDo(description);
    myList.addToDo(description);
   expect(document.querySelectorAll('.tasks').length).toBe(3);
    });
  });

  describe('Test remove', () => {
    test('remove', () => {
      document.body.innerHTML = '<div class="tasks-container" id="tasks-list"> </div>';
      let task = document.getElementById('tasks-list');
      let myList = new ToDoList();
      myList.setReference(task);
      const description = 'test';

      myList.addToDo(description);
      myList.addToDo(description);
      myList.addToDo(description);

      const deleteIcons = document.querySelectorAll('.fa-trash-alt');

      deleteIcons[0].click();
      ToDoList.removeTask(deleteIcons[0]);
      expect(document.querySelectorAll('.tasks').length).toBe(2);
    });
  });

/*   describe('Test Edit', () => {
    test('Does editing works', () => {
      //resetLocalStorage();
      document.body.innerHTML = '<div class="tasks-container" id="tasks-list"> </div>';
      let task = document.getElementById('tasks-list');
      let myList = new ToDoList();
      myList.setReference(task);
      const description = 'test';
      add(description);

      const editIcons = document.querySelectorAll('.fa-ellipsis-v');
      expect(ToDoList.editTask(i.previousElementSibling,i.previousElementSibling.lastElementChild))
    editIcons.forEach((i) => i.addEventListener('click', () => {
      ToDoList.editTask(i.previousElementSibling, i.previousElementSibling.lastElementChild);
      window.location.reload();
    }));
    
           // expect(JSON.parse(localStorage.getItem('ToDoItems'))[0].description).toBe('test'); 
    });
}) */

describe('update status', () => {
    test('when user clicks on a checkbox task status should change to completed', () => {
      //resetLocalStorage();
      document.body.innerHTML = '<div class="tasks-container" id="tasks-list"> </div>';
      let task = document.getElementById('tasks-list');
      let myList = new ToDoList();
      myList.setReference(task);
      const description = 'test';
      let tasksArray=[
        {
        description:'test',
        completed : false,
        index : 0
        }
      ]
      myList.addToDo(tasksArray[0].description);

      const checkBoxes = document.querySelectorAll('.status');
      checkBoxes[0].click();
      let output = changeTaskStatus(checkBoxes[0], tasksArray);

      expect(output[0].completed).toBe(true);

    })

    test('when user clicks again to an already selected checkbox completed should be false', () => {
        document.body.innerHTML = '<div class="tasks-container" id="tasks-list"> </div>';
        let task = document.getElementById('tasks-list');
        let myList = new ToDoList();
        myList.setReference(task);
        const description = 'test';
        let tasksArray=[
          {
          description:'test',
          completed : false,
          index : 0
          }
        ]
        myList.addToDo(tasksArray[0].description);
  
        const checkBoxes = document.querySelectorAll('.status');
        //first click
        checkBoxes[0].click();
        //second click
        checkBoxes[0].click();
        let output = changeTaskStatus(checkBoxes[0], tasksArray);
  
        expect(output[0].completed).toBe(false);
  
      })
}
)

