import $ from 'jquery';
import taskTemplate from './task-template';
import { fetchAvailableTasks, reserveTasks, finishTaskAssginment } from 'turkassign-browser';

/*
tasks = [
  {
    data: task data,
    budget: remaining budget,
    limit: time limit that worker perform
  }
]
*/

fetchAvailableTasks().then(tasks => {
  if (tasks.length === 0) {
    return;
  }

  const index = parseInt(Math.random() * tasks.length);
  const selectedTask = tasks[index];
  reserveTasks([ selectedTask ]);

  $('#content').html(taskTemplate(selectedTask.data));

  finishTaskAssginment();
});
