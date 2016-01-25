import $ from 'jquery';
import taskTemplate from './task-template';
import turkassign from 'turkassign-browser';

/*
tasks = [
  {
    data: task data,
    budget: remaining budget,
    limit: time limit that worker perform
  }
]
*/

turkassign.fetchAvailableTasks().then(tasks => {
  if (tasks.length === 0) {
    return;
  }

  const index = parseInt(Math.random() * tasks.length);
  const selectedTask = tasks[index];
  turkassign.reserveTasks([ selectedTask ]);

  $('#content').html(taskTemplate(selectedTask.data));

  turkassign.finishTaskAssginment();
});
