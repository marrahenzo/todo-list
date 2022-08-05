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

export { Task, Project };
