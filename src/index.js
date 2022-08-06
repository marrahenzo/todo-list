import './style.css';
import {
  addProject,
  addTask,
  loadProjects,
  loadTasks,
  findProject,
  displayCreateModal,
  closeModal,
} from './domScripts';
import { Task, Project } from './classes';

//Removes project from array
export function deleteProject(project) {
  let index = findProjectIndex(projects, project);
  projects.splice(index, 1);
  saveLocalStorage();
}

//Returns the index of the provided project
function findProjectIndex(projects, project) {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === project.name) return i;
  }
  return -1;
}

//Returns the index of the task from the tasks array in the provided project
function findTaskIndex(project, task) {
  for (let i = 0; i < project.tasks.length; i++) {
    if (JSON.stringify(project.tasks[i]) === JSON.stringify(task)) return i;
  }
  return -1;
}

let projects = [];

//Save data to localStorage

export function saveLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

//Load data from localStorage if exists
//If not, load a dummy project and task

if (localStorage.length > 0) {
  let savedProjects = JSON.parse(localStorage.getItem('projects'));
  for (let project of savedProjects) {
    let newProject = new Project(project._name, project.tasks);
    projects.push(newProject);
  }
} else {
  projects.push(new Project('Main'));
  let testTask = new Task(
    'Hello, world!',
    'This is a test',
    '2022-08-05',
    'Low'
  );
  projects[0].tasks.push(testTask);
}

//Get project and task list DOM elements and fill them with the available data
const projectList = document.querySelector('#projects-container');
loadProjects(projectList, projects);

const taskList = document.querySelector('#tasks-container');
loadTasks(taskList, projects[0]);

let newProjectButton = document.querySelector('#btn-new-project');
let newTaskButton = document.querySelector('#btn-new-task');

//Modal submit button functionality

let projectTitle = document.querySelector('#project-name');

//Takes data from the form, creates a task, pushes it into the tasks array
//of its respective project and creates a new task in the DOM
let modalCreateContainer = document.querySelector('.modal-create-container');
let modalCreateSubmit = document.querySelectorAll('.modal-submit')[1];
let createTitle = document.querySelector('#create-title');
let createDescription = document.querySelector('#create-description');
let createDueDate = document.querySelector('#create-due-date');
let createPriority = document.querySelector('#create-priority');
modalCreateSubmit.addEventListener('click', () => {
  let currentProject = findProject(projects, projectTitle.textContent);
  let newTask = new Task(
    createTitle.value,
    createDescription.value,
    createDueDate.value,
    createPriority.value
  );
  currentProject.tasks.push(newTask);
  saveLocalStorage();
  addTask(taskList, currentProject, newTask);
  closeModal(modalCreateContainer);
  createTitle.value = '';
  createDescription.value = '';
  createDueDate.value = '';
  createPriority.value = 'Low';
});

//Sends project and task to submit button in edit form

let modalEditSubmit = document.querySelectorAll('.modal-submit')[0];
let editModalProject, editModalTask;
modalEditSubmit.addEventListener('click', editTask);

export function prepareEditModal(project, task) {
  editModalProject = project;
  editModalTask = task;
}

//Takes data from form, creates a new task, pushes into the tasks array
//of its respective project and refreshes de task DOM list

function editTask() {
  let modalEditContainer = document.querySelector('.modal-edit-container');
  let editTitle = document.querySelector('#edit-title');
  let editDescription = document.querySelector('#edit-description');
  let editDueDate = document.querySelector('#edit-due-date');
  let editPriority = document.querySelector('#edit-priority');
  let taskIndex = findTaskIndex(editModalProject, editModalTask);

  let newTask = new Task(
    editTitle.value,
    editDescription.value,
    editDueDate.value,
    editPriority.value
  );

  editModalProject.tasks[taskIndex] = newTask;
  saveLocalStorage();
  closeModal(modalEditContainer);
  taskList.textContent = '';
  loadTasks(taskList, editModalProject);
}

//If clicked, prompts for a name input, creates a new project
// and appends it to the dom

newProjectButton.addEventListener('click', () => {
  let newProject;
  do {
    newProject = new Project(
      prompt('Enter a name for the new project', 'Project')
    );
  } while (newProject.name === '' || newProject.name === undefined);
  projects.push(newProject);
  saveLocalStorage();

  addProject(projectList, newProject, projects.length);
});

//If clicked, calls the task creation modal

newTaskButton.addEventListener('click', () => {
  displayCreateModal();
});
