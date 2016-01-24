import taskTemplate from './task-template';
import { fetchAvailableTasks, reserveTasks, finishTaskAssginment } from 'task-pooler-assignment-helper';

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

fetchAvailableTasks().then(tasks => {
  if (taskSet.length === 0) {
    return;
  }

  const index = parseInt(Math.random() * tasks.length);
  const selectedTask = tasks[index];
  reserveTasks([ selectedTask ]);

  document.getElementById('content').innerHTML = taskTemplate(selectedTask.data.images);

  finishTaskAssginment();
});
