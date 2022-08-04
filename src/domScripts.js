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

  let taskDescription = document.createElement('p');
  taskDescription.className = 'task-description';
  taskDescription.textContent = task.description;

  let taskDate = document.createElement('p');
  taskDate.className = 'task-date';
  taskDate.textContent = task.dueDate;

  let taskPriority = document.createElement('p');
  taskPriority.className = 'task-priority';
  taskPriority.textContent = task.priority;

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
  taskCheckBox.type = 'checkbox';

  taskDeleteButton.addEventListener('click', () => {
    deleteTask(project, task, taskElement);
  });

  taskCheckBox.addEventListener('click', () => {
    taskElement.classList.toggle('done');
    task.toggleDone();
  });

  taskElement.append(
    taskCheckBox,
    taskName,
    taskDescription,
    taskDate,
    taskPriority,
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
  console.log(project.tasks);
}

function getCurrentProject(projects, name) {
  for (let project of projects) {
    if (project.name === name) return project;
  }
}

export { addProject, addTask, loadProjects, loadTasks, getCurrentProject };
