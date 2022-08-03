import './style.css';
import { addChild } from './domScripts';

class Task {
  done = false;

  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  markDone() {
    this.done = true;
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

const Priorities = Object.freeze({
  High: 'High',
  Medium: 'Medium',
  Low: 'Low',
});

let projects = [new Project('Main')];

let newProjectButton = document.querySelector('#btn-new-project');
let newTaskButton = document.querySelector('#btn-new-task');

console.log(newProjectButton);

newProjectButton.addEventListener('click', () => {
  let newProject = new Project(
    prompt('Enter a name for the new project', 'Project')
  );
  projects.push(newProject);

  let projectList = document.querySelector('#projects-container');
  let projectElement = document.createElement('div');
  projectElement.textContent = newProject.name;
  projectElement.className = 'project';
  projectElement.id = 'project' + projects.length;

  addChild(projectList, projectElement);
});

let project1 = new Project('test');
let task1 = new Task('test', 'this is a test', '2022-1-1', Priorities.High);
project1.addTask(task1);
