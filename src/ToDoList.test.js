/**
 * @jest-environment jsdom
 */
/* eslint-disable*/

import { ToDoList } from "./ToDoList";
import {changeTaskStatus} from "./taskStatusUpdate";

//test to check add to list function
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

  // test if task is removed as the user clicks on the trashcan
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

  //test task edit function
  describe('Test Edit', () => {
    test('Does editing works', () => {
      document.body.innerHTML = '<div class="tasks-container" id="tasks-list"> </div>';
      let task = document.getElementById('tasks-list');
      let myList = new ToDoList();
      myList.setReference(task);
      let tasksArray=[
        {
            description:'task 1',
            completed : true,
            index : 0
        },
        {
            description:'task 2',
            completed : false,
            index : 1
        },
        {
            description:'task 3',
            completed : true,
            index : 2
        }
      ];

      const expected = [1].description= 'Gym Workout';

      myList.addToDo(tasksArray[0].description);
      myList.addToDo(tasksArray[1].description);
      myList.addToDo(tasksArray[2].description);
      const allTasks = document.querySelectorAll('.tasks');

      const editIcons = document.querySelectorAll('.fa-ellipsis-v');
      editIcons[1].click();
      const param1 = editIcons[1].previousElementSibling;
      const param2 = editIcons[1].previousElementSibling.lastElementChild;
      let output = ToDoList.editToDo(param1, param2 , 'Gym Workout', 1);
      expect(output[1].description).toStrictEqual(expected);
    
    })

})

// test to update task status as the user clicks on checkboxes
describe('update status', () => {
    test('when user clicks on a checkbox task status should change to completed', () => {
      
      document.body.innerHTML = '<div class="tasks-container" id="tasks-list"> </div>';
      let task = document.getElementById('tasks-list');
      let myList = new ToDoList();
      myList.setReference(task);

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

// test to clear selected tasks
describe('Clear all selected tasks', () => { 
    test('if it clears all the selected tasks', () => {
    
      document.body.innerHTML = `<div class="tasks-container" id="tasks-list"> </div>
      '<button type="button"> Clear all completed</button>`;
      let task = document.getElementById('tasks-list');
      let myList = new ToDoList();
      myList.setReference(task);
      
      let tasksArray=[
        {
            description:'task 1',
            completed : true,
            index : 0
        },
        {
            description:'task 2',
            completed : false,
            index : 1
        },
        {
            description:'task 3',
            completed : true,
            index : 2
        }
      ]
      myList.addToDo(tasksArray[0].description);
      myList.addToDo(tasksArray[1].description);
      myList.addToDo(tasksArray[2].description);
      const allTasks = document.querySelectorAll('.tasks');
      const clearTasks = document.querySelector('button');
      clearTasks.click();
      let output = (ToDoList.removeSelectedTasks(tasksArray, allTasks));

      expect(output.length).toBe(1);

    })
}
) 