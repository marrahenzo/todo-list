import './style.css';
import {
  addProject,
  addTask,
  loadProjects,
  loadTasks,
  getCurrentProject,
} from './domScripts';

class Task {
  done = false;

  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  toggleDone() {
    this.done = !this.done;
  }
}

class Project {
  tasks = [];

  constructor(name) {
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    if (typeof newName === 'string') this._name = newName;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    tasks[this.findTask(task)];
  }

  findTask(task) {
    let index = this.tasks.indexOf(task);
    return index;
  }
}

const Priority = Object.freeze({
  High: 'High',
  Medium: 'Medium',
  Low: 'Low',
});

let projects = [];

//TODO: Remove later
projects.push(new Project('Main'));
let testTask = new Task('test', 'test', '1-1-1001', Priority.Medium);
projects[0].addTask(testTask);
//

const projectList = document.querySelector('#projects-container');
loadProjects(projectList, projects);

const taskList = document.querySelector('#tasks-container');
loadTasks(taskList, projects[0]);

let newProjectButton = document.querySelector('#btn-new-project');
let newTaskButton = document.querySelector('#btn-new-task');

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
  let currentProject = getCurrentProject(projects, projectName);

  let newTask = new Task('test', 'test', '1-1-1001', Priority.Medium);
  currentProject.tasks.push(newTask);

  addTask(taskList, currentProject, newTask);
});
