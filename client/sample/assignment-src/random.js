import taskTemplate from './task-template';

/*
worker assigned a task which is choosed by random

taskSet = [
  {
    data: task data,
    budget: remaining budget, budget should be > 0
    reserve: reserve this task,
    unreserve: unreserve this task
  }
]
*/

fetchAvailabeleTaskSet(window.taskSetId).then(taskSet => {
  if (taskSet.length === 0) {
    return;
  }

  const index = parseInt(Math.random() * taskSet.length);
  const selectedTask = taskSet[index];
  selectedTask.reserve();

  document.getElementById('content').innerHTML = taskTemplate(selectedTask.data.images);

  finishTaskAssginment();
});
