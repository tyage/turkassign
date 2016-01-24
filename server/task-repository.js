/*
taskRepository = {
  groupId: [
    task,
    task,
  ]
}

task = {
  data: task data,
  budget: remaining budget,
  limit: performing limit for worker after assignment
}
*/
const taskRepository = {};

const createTaskGroup = tasks => {
  // TODO: set id to each task
  const groupId = uuid();
  taskRepository[groupId] = tasks;
  return id;
};
const getAllTasks = () => taskRepository;
const getTaskGroup = groupId => taskRepository[groupId] || null;
const getTasks = ids => {
  const tasks = [];
  ids.forEach(id => {
    const task = getTask(id);
    if (task !== null) {
      tasks.push(task);
    }
  });
  return tasks;
};
const getTask = id => {
  for (let taskGroup of taskRepository) {
    const task = taskGroup.find(task => task.id === id);
    if (task !== null) {
      return task;
    }
  }
  return null;
};

export {
  createTasks,
  getTaskGroup,
  getTasks,
  getTask
};
