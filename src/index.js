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

export function deleteProject(project) {
  let index = findProjectIndex(projects, project);
  projects.splice(index, 1);
}

function findProjectIndex(projects, project) {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === project.name) return i;
  }
  return -1;
}

function findTaskIndex(project, task) {
  for (let i = 0; i < project.tasks.length; i++) {
    if (JSON.stringify(project.tasks[i]) === JSON.stringify(task)) return i;
  }
  return -1;
}

let projects = [];

//TODO: Remove later
projects.push(new Project('Main'));
let testTask = new Task('Hello, world!', 'This is a test', '2022-08-05', 'Low');
projects[0].addTask(testTask);
//

const projectList = document.querySelector('#projects-container');
loadProjects(projectList, projects);

const taskList = document.querySelector('#tasks-container');
loadTasks(taskList, projects[0]);

let newProjectButton = document.querySelector('#btn-new-project');
let newTaskButton = document.querySelector('#btn-new-task');

//Modal submit button functionality

let projectTitle = document.querySelector('#project-name');

//Task creation
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
  addTask(taskList, currentProject, newTask);
  closeModal(modalCreateContainer);
  createTitle.value = '';
  createDescription.value = '';
  createDueDate.value = '';
  createPriority.value = 'Low';
});

//Task editing

let modalEditSubmit = document.querySelectorAll('.modal-submit')[0];
let editModalProject, editModalTask;
modalEditSubmit.addEventListener('click', editTask);

export function prepareEditModal(project, task) {
  editModalProject = project;
  editModalTask = task;
}

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
  console.log(editModalProject.tasks);
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

  addProject(projectList, newProject, projects.length);
});

//If clicked, creates a new (dummy) task and appends it to the dom

newTaskButton.addEventListener('click', () => {
  let projectName = document.querySelector('#project-name').textContent;
  let currentProject = findProject(projects, projectName);

  displayCreateModal();
});
