import { deleteProject } from './index';

function addProject(list, project, id) {
  let projectElement = document.createElement('a');
  projectElement.href = '#';
  projectElement.textContent = project.name;
  projectElement.className = 'project';
  projectElement.id = 'project' + id;

  projectElement.addEventListener('click', () => {
    document.querySelector('#project-name').textContent = project.name;
    let list = document.querySelector('#tasks-container');
    list.textContent = '';
    loadTasks(list, project);
  });

  list.append(projectElement);
}

function loadProjects(list, projects) {
  for (let project of projects) {
    addProject(list, project, projects.length);
  }
}

function addTask(list, project, task) {
  let taskElement = document.createElement('div');
  taskElement.className = 'task';
  taskElement.id = 'task' + project.tasks.length;

  let taskName = document.createElement('p');
  taskName.className = 'task-name';
  taskName.textContent = task.name;

  let taskDate = document.createElement('p');
  taskDate.className = 'task-date';
  taskDate.textContent = task.dueDate;

  let taskInfoButton = document.createElement('a');
  taskInfoButton.className = 'task-info';

  let taskInfoImage = document.createElement('img');
  taskInfoImage.src = './src/media/info.svg';
  taskInfoButton.append(taskInfoImage);

  let taskEditButton = document.createElement('a');
  taskEditButton.className = 'task-edit';

  let taskEditButtonImage = document.createElement('img');
  taskEditButtonImage.src = './src/media/edit.svg';
  taskEditButton.append(taskEditButtonImage);

  let taskDeleteButton = document.createElement('a');
  taskDeleteButton.className = 'task-delete';

  let taskDeleteButtonImage = document.createElement('img');
  taskDeleteButtonImage.src = './src/media/delete.svg';
  taskDeleteButton.append(taskDeleteButtonImage);

  let taskCheckBox = document.createElement('input');
  taskCheckBox.className = 'task-checkbox';
  taskCheckBox.type = 'checkbox';

  if (task.done) {
    taskCheckBox.checked = true;
    taskElement.classList.add('done');
  }

  taskElement.dataset.priority = task.priority;

  taskCheckBox.addEventListener('click', () => {
    taskElement.classList.toggle('done');
    task.toggleDone();
  });

  taskDeleteButton.addEventListener('click', () => {
    deleteTask(project, task, taskElement);
  });

  taskInfoButton.addEventListener('click', () => {
    displayInfoModal(task);
  });

  taskElement.append(
    taskCheckBox,
    taskName,
    taskDate,
    taskInfoButton,
    taskEditButton,
    taskDeleteButton
  );
  list.append(taskElement);
}

function loadTasks(list, project) {
  for (let task of project.tasks) {
    addTask(list, project, task);
  }
}

function deleteTask(project, task, node) {
  let index = project.findTask(task);
  project.tasks.splice(index, 1);
  node.remove();
  //TODO: implement project deletion if the deleted task is the
  //  last one on the project
  if (project.tasks.length === 0) {
    document.querySelectorAll('.project').forEach((element) => {
      if (element.textContent === project.name) element.remove();
    });
    deleteProject(project);
  }
}

function getCurrentProject(projects, name) {
  for (let project of projects) {
    if (project.name === name) return project;
  }
}

function displayInfoModal(task) {
  let modal = document.querySelector('.modal-info-container');
  let title = document.querySelector('#info-title');
  let description = document.querySelector('#info-description');
  let dueDate = document.querySelector('#info-due-date');
  let priority = document.querySelector('#info-priority');
  let closeButton = document.querySelectorAll('.modal-close')[0];

  title.textContent = task.name;
  description.textContent = task.description;
  dueDate.textContent = 'Due: ' + task.dueDate;
  priority.textContent = 'Priority: ' + task.priority;
  modal.classList.add('show');

  closeButton.addEventListener('click', () => {
    closeModal(modal);
  });
}

function displayCreateModal() {
  let modal = document.querySelector('.modal-create-container');
  let closeButton = document.querySelectorAll('.modal-close')[2];

  modal.classList.add('show');

  closeButton.addEventListener('click', () => {
    closeModal(modal);
  });
}

function closeModal(modal) {
  modal.classList.remove('show');
}

export {
  addProject,
  addTask,
  loadProjects,
  loadTasks,
  getCurrentProject,
  displayCreateModal,
  closeModal,
};
