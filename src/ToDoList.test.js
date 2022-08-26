/**
 * @jest-environment jsdom
 */
/* eslint-disable*/

import { ToDoList } from "./ToDoList";

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
      /* for(let index = 0; index<5; index++){
        let t = new Task('test-'+1, false, index);
      } */
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