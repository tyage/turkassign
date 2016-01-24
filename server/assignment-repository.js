/*
assignmentRepository = [
  assignmentOfTask,
  assignmentOfTask,
]

assignmentOfTask = {
  taskId: id of task,
  workerId: id of worker
  assignmentTime: time when assigned,
  status: statuses.ASSIGNED or statuses.REJECTED or statuses.FINISHED,
}
*/
const assignmentRepository = {};

// if task has not finished yet for some fixed time after assignment, remove the assignment
const watchTaskAssignment = () => {
  getAllTasks().forEach(tasks => {

  });
};
setInterval(watchTaskAssignment, 1000);
