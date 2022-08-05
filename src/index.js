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

let projects = [];

//TODO: Remove later
projects.push(new Project('Main'));
let testTask = new Task('test', 'test', '1-1-1001', 'Medium');
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
let modalCreateContainer = document.querySelector('.modal-create-container');
let modalSubmit = document.querySelectorAll('.modal-submit');
let title = document.querySelector('#create-title');
let description = document.querySelector('#create-description');
let dueDate = document.querySelector('#create-due-date');
let priority = document.querySelector('#create-priority');
modalSubmit.forEach((button) => {
  button.addEventListener('click', () => {
    let currentProject = findProject(projects, projectTitle.textContent);
    let newTask = new Task(
      title.value,
      description.value,
      dueDate.value,
      priority.value
    );
    currentProject.tasks.push(newTask);
    addTask(taskList, currentProject, newTask);
    closeModal(modalCreateContainer);
  });
});

//If clicked, prompts for a name input, creates a new project
// and appends it to the dom

newProjectButton.addEventListener('click', () => {
  let newProject = new Project(
    prompt('Enter a name for the new project', 'Project')
  );
  projects.push(newProject);

  addProject(projectList, newProject, projects.length);
});

//If clicked, creates a new (dummy) task and appends it to the dom

newTaskButton.addEventListener('click', () => {
  let projectName = document.querySelector('#project-name').textContent;
  let currentProject = findProject(projects, projectName);

  displayCreateModal();
});
