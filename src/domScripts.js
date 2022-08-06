import { deleteProject, prepareEditModal } from './index';
import { format, parseISO } from 'date-fns';

function addProject(list, project, id) {
  let projectElement = document.createElement('a');
  projectElement.href = '#';
  projectElement.textContent = project.name;
  projectElement.className = 'project';
  projectElement.id = 'project' + id;

  projectElement.addEventListener('click', () => {
    let projectNameTitle = document.querySelector('#project-name');
    projectNameTitle.textContent = project.name;

    let list = document.querySelector('#tasks-container');
    list.textContent = '';

    let newTaskButton = document.querySelector('#btn-new-task');
    showElement(projectNameTitle);
    showElement(newTaskButton);

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
  if (task.dueDate === '') task.dueDate = format(new Date(), 'yyyy-MM-dd');
  taskDate.textContent = format(parseISO(task.dueDate), 'MMM do');
  task.dueDate = format(parseISO(task.dueDate), 'MMMM do, yyyy');

  let taskInfoButton = document.createElement('a');
  taskInfoButton.className = 'task-info';

  let taskInfoImage = document.createElement('img');
  taskInfoImage.src = './src/media/info.svg';
  taskInfoButton.append(taskInfoImage);

  let taskEditButton = document.createElement('a');
  taskEditButton.className = 'task-edit';
  taskEditButton.id = project.tasks.length;

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

  taskInfoButton.addEventListener('click', () => {
    displayInfoModal(task);
  });

  taskEditButton.addEventListener('click', () => {
    displayEditModal(project, task);
  });

  taskDeleteButton.addEventListener('click', () => {
    deleteTask(project, task, taskElement);
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
  let projectNameTitle = document.querySelector('#project-name');
  let newTaskButton = document.querySelector('#btn-new-task');
  project.tasks.splice(index, 1);
  node.remove();
  if (project.tasks.length === 0 && project.name != 'Main') {
    document.querySelectorAll('.project').forEach((element) => {
      if (element.textContent === project.name) element.remove();
    });
    hideElement(projectNameTitle);
    hideElement(newTaskButton);
    deleteProject(project);
  }
}

function findProject(projects, name) {
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

function displayEditModal(project, task) {
  let modal = document.querySelector('.modal-edit-container');
  let closeButton = document.querySelectorAll('.modal-close')[1];
  let editTitle = document.querySelector('#edit-title');
  editTitle.value = task.name;
  let editDescription = document.querySelector('#edit-description');
  editDescription.value = task.description;
  let editDueDate = document.querySelector('#edit-due-date');
  editDueDate.value = task.dueDate;
  let editPriority = document.querySelector('#edit-priority');
  editPriority.value = task.priority;

  prepareEditModal(project, task);

  modal.classList.add('show');

  closeButton.addEventListener('click', () => {
    closeModal(modal);
  });
}

function displayCreateModal() {
  let modal = document.querySelector('.modal-create-container');
  let closeButton = document.querySelectorAll('.modal-close')[2];
  let createTitle = document.querySelector('#create-title');
  let createDescription = document.querySelector('#create-description');
  let createDueDate = document.querySelector('#create-due-date');
  let createPriority = document.querySelector('#create-priority');

  modal.classList.add('show');

  closeButton.addEventListener('click', () => {
    createTitle.value = '';
    createDescription.value = '';
    createDueDate.value = '';
    createPriority.value = 'Low';
    closeModal(modal);
  });
}

function closeModal(modal) {
  modal.classList.remove('show');
}

function toggleElementVisibility(element) {
  element.classList.toggle('hidden');
}

function showElement(element) {
  element.classList.remove('hidden');
}

function hideElement(element) {
  element.classList.add('hidden');
}

export {
  addProject,
  addTask,
  loadProjects,
  loadTasks,
  findProject,
  displayCreateModal,
  closeModal,
};
