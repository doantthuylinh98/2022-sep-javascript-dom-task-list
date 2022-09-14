'use strict';

const $ = document.querySelector.bind(document);

const form = $('form');
const taskInput = $('#task');
const clearTaskBtn = $('.clear-task');
const filter = $('#filter');

const taskList = $('.collection');
//--------------------------------
//--------------------------------
//--------------------------------
app();

function app() {
  // Load list event:
  document.addEventListener('DOMContentLoaded', getTaskFromLS);
  // Add task event:
  form.addEventListener('submit', handleSubmit);
  // Delete task event:
  taskList.addEventListener('click', handleDelete);
  // Clear all tasks event:
  clearTaskBtn.addEventListener('click', handleClearTask);
  // Filter events
  filter.addEventListener('keyup', handleFilterTask);
}
//--------------------------------
//--------------------------------
//--------------------------------
function getTaskFromLS() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  console.log(tasks);
  tasks.forEach((task) => createLi(task));
}

function saveTaskToLS(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  if (task !== '') {
    tasks.push(task);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromLS(task) {
  console.log(task);
  const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
  tasks.forEach((item, index) => {
    if (task === item) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAllTaskFromLS() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = [];
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//--------------------------------
//--------------------------------
//--------------------------------
function handleSubmit(e) {
  if (taskInput.value === '') {
    alert('Write something first!');
  } else {
    createLi(taskInput.value);
    saveTaskToLS(taskInput.value);
    console.log(taskInput.value);
    taskInput.value = '';
  }
  e.preventDefault();
}

function handleDelete(e) {
  if (e.target.classList.contains('fa-remove')) {
    if (confirm('Are you sure?')) {
      let task = e.target.parentElement.parentElement;
      task.remove();
      deleteTaskFromLS(task.textContent);
    }
  }
  e.preventDefault();
}

function handleClearTask(e) {
  if (taskList.innerHTML === '') {
    alert("There's no task. Add task first!");
  } else {
    if (confirm('You are going to delete all tasks. Are you sure?')) {
      while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }
      clearAllTaskFromLS();
    }
  }

  e.preventDefault();
}

function handleFilterTask(e) {
  let filterText = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach((task) => {
    const liText = task.firstChild.textContent;
    if (liText.toLowerCase().indexOf(filterText) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
//--------------------------------
//--------------------------------
//--------------------------------
function createLi(task) {
  const li = document.createElement('li');
  li.classList.add('collection-item');
  li.appendChild(document.createTextNode(`${task}`));

  const link = document.createElement('a');
  link.setAttribute('href', '#');
  link.className = 'delete-item secondary-content';
  link.style.marginRight = '0';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);
}
