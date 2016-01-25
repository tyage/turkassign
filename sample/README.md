# Sample task assignment program

Assign a task using Turkassign.

Assignment algorithm is random assignment.

Run with:

```sh
$ AWS_ACCESS_KEY_ID=XXX AWS_SECRET_ACCESS_KEY=XXX npm start
```

## Sample assignment algorithm

```javascript
import $ from 'jquery';
import taskTemplate from './task-template';
import turkassign from 'turkassign-browser';

turkassign.fetchAvailableTasks().then(tasks => {
  // if there is no more tasks, finish the assignment
  if (tasks.length === 0) {
    return;
  }

  // select a task from taskSet
  const index = parseInt(Math.random() * tasks.length);
  const selectedTask = tasks[index];
  turkassign.reserveTasks([ selectedTask ]);

  // show task page
  $('#content').html(taskTemplate(selectedTask.data));

  // finish task assignment
  turkassign.finishTaskAssginment();
});
```
