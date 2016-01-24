/*
taskRepository = {
  id: [
    { task1 },
    { task2 },
  ]
}

task = {
  data: task data,
  budget: remaining budget,
  limit: performing limit for worker after assignment
}
*/
const taskRepository = {};

const createTasks = tasks => {
  const id = uuid();
  taskRepository[id] = tasks;
  return id;
};
const getTasks = id => taskRepository[id];

export {
  createTasks,
  getTasks
};
