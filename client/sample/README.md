# Sample task assignment program

Assign a task using Task pooler.

Default assignment algorithm is random assignment.

Run with:

```sh
$ AWS_ACCESS_KEY_ID=XXX AWS_SECRET_ACCESS_KEY=XXX npm start
```

## Sample assignment algorithm

You can use these APIs:

- fetchTaskSet
    - fetch all tasks
- fetchAvailableTaskSet
    - fetch tasks which has one or more budgets
- finishTaskAssginment
   - finish task assignment algorithm and call `turkSetAssignmentID`

```javascript
fetchAvailableTaskSet().then(taskSet => {
  // if there is no more tasks, finish the assignment
  if (taskSet.length === 0) {
    return;
  }

  // select a task from taskSet
  const taskId = parseInt(Math.random() * taskSet.length);
  const selectedTask = taskSet[taskId];
  selectedTask.reserve();

  // show task page
  document.getElementById('content').innerHTML = taskTemplate(selectedTask.data.images);

  // finish task assignment
  finishTaskAssginment();
});
```
