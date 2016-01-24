import { getTask } from './task';
import uuid from 'node-uuid';

/*
assignmentRepository = [
  assignment,
  assignment,
]

assignment = {
  taskId: id of task,
  workerId: id of worker
  createdAt: time when assigned,
  status: statuses.ASSIGNED or statuses.TIMEOUT or statuses.FINISHED,
}
*/
const assignmentRepository = [];

const statuses = {
  ASSIGNED: 'ASSIGNED',
  TIMEOUT: 'TIMEOUT',
  FINISHED: 'FINISHED',
};

// if task has not finished yet for some fixed time after assignment, remove the assignment
const watchTaskAssignment = () => {
  const currentTime = new Date();
  assignmentRepository.forEach(assignment => {
    const task = getTask(assignment.taskId);
    if (task === null || task.status !== statuses.ASSIGNED) {
      return;
    }
    if (currentTime.getTime() > assignment.createdAt.getTime() + task.limit) {
      task.status = statuses.TIMEOUT;
      ++task.budget;
      console.log(`assignment ${assignment.id} is timeout`)
    }
  });
};
setInterval(watchTaskAssignment, 1000);

const createAssignment = (taskId, workerId) => {
  const task = getTask(assignment)
  if (task === null) {
    return;
  }
  --task.budget;

  const id = uuid();
  const assignment = {
    id,
    taskId,
    workerId,
    createdAt: new Date(),
    status: statuses.ASSIGNED
  };
  assignmentRepository.push(assignment);

  return assignment;
};

const getAssignment = id => {
  return assignmentRepository.find(assignment => assignment.id === id);
}

const finishAssignment = (id, workerId) => {
  const assignment = getAssignment(id);
  if (assignment === null ||
    assignment.status === statuses.TIMEOUT ||
    assignment.workerId !== workerId) {
    return;
  }
  assignment.status = statuses.FINISHED;
  return assignment;
}

export {
  createAssignment,
  getAssignment,
  finishAssignment
};
