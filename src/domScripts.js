function addChild(element, child) {
  element.appendChild(child);
}

function addChildren(element, ...children) {
  element.append(...children);
}

function addProject(list, project, id) {
  let projectElement = document.createElement('div');
  projectElement.textContent = project.name;
  projectElement.className = 'project';
  projectElement.id = 'project' + id;

  addChild(list, projectElement);
}

function loadProjects(list, projects) {
  for (let project of projects) {
    addProject(list, project, projects.length);
  }
}

function addTask(list, project, task) {
  let taskElement = document.createElement('div');
  taskElement.textContent = task.name;
  taskElement.className = 'task';
  taskElement.id = 'task' + project.tasks.length;

  addChild(list, taskElement);
}

function loadTasks(list, project) {
  for (let task of project.tasks) {
    addTask(list, project, task);
  }
}

export { addChild, addChildren, addProject, addTask, loadProjects, loadTasks };
