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
  status: assignment status
}
*/
const assignmentRepository = [];

const statuses = {
  ASSIGNED: 'ASSIGNED',
  TIMEOUT: 'TIMEOUT',
  FINISHED: 'FINISHED',
  CANCELED: 'CANCELED',
};

// if task has not finished yet for some fixed time after assignment, remove the assignment
const watchTaskAssignment = () => {
  const currentTime = new Date();
  assignmentRepository.forEach(assignment => {
    const task = getTask(assignment.taskId);
    if (task === null || !task.limit) {
      return;
    }
    if (currentTime.getTime() > assignment.createdAt.getTime() + task.limit * 1000) {
      timeoutAssignment(assignment.id);
      console.log(`assignment ${assignment.id} is timeout`);
    }
  });
};
setInterval(watchTaskAssignment, 1000);

const createAssignment = (taskId, workerId) => {
  const task = getTask(taskId);
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
  return assignmentRepository.find(assignment => assignment.id === id) || null;
};

const timeoutAssignment = id => {
  const assignment = getAssignment(id);
  if (assignment === null ||
    assignment.status !== statuses.ASSIGNED) {
    return;
  }

  const task = getTask(assignment.taskId);
  ++task.budget;
  assignment.status = statuses.TIMEOUT;

  return assignment;
};

const finishAssignment = (id, workerId) => {
  const assignment = getAssignment(id);
  if (assignment === null ||
    assignment.status !== statuses.ASSIGNED ||
    assignment.workerId !== workerId) {
    return;
  }

  assignment.status = statuses.FINISHED;

  return assignment;
};

const cancelAssignment = (id, workerId) => {
  const assignment = getAssignment(id);
  if (assignment === null ||
    assignment.status !== statuses.ASSIGNED ||
    assignment.workerId !== workerId) {
    return;
  }

  const task = getTask(assignment.taskId);
  ++task.budget;
  assignment.status = statuses.CANCELED;

  return assignment;
};

export {
  createAssignment,
  getAssignment,
  finishAssignment,
  cancelAssignment
};
