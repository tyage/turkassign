import $ from 'jquery';
import _ from 'lodash';
import { assignTasks, fetchTaskGroup, finishAssignments, cancelAssignments } from './task-pool';

if (!window || !window.document) {
  throw new Error('turkassign requires a window');
}

const assignments = [];

// task which budget > 0
const fetchAvailableTasks = taskGroupId => {
  return fetchTaskGroup(taskGroupId).then(({ taskGroup }) => {
    return _.filter(taskGroup, task => task.budget > 0);
  });
};

// reserve tasks
const reserveTasks = tasks => {
  const taskIds = _.map(tasks, task => task.id);
  return assignTasks(taskIds).then(res => {
    const newAssignments = res.assignments;
    _.each(newAssignments, assignment => {
      assignments.push(assignment);
    });
    return newAssignments;
  });
};

// ページから離脱する場合に、割当てを解除する
const unreserveTasks = () => {
  if (assignments.length > 0) {
    cancelAssignments(_.map(assignments, assignment => assignment.id));
  }
};
$(window).on('beforeunload', unreserveTasks);

const finishTask = () => {
  // タスクが完了した場合は、割当てを解除する必要はない
  $(window).off('beforeunload', unreserveTasks);

  if (assignments.length > 0) {
    finishAssignments(_.map(assignments, assignment => assignment.id));
  }
};

const finishTaskAssginment = () => {
  switch (window.platformType) {
    case 'MTurk':
      turkSetAssignmentID();

      $('#mturk_form').submit(() => {
        finishTask();
      });
      break;
  }
};

export default {
  reserveTasks,
  fetchAvailableTasks,
  finishTaskAssginment
};
