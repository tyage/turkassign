import $ from 'jquery';
import _ from 'lodash';
import { assignTasks, fetchTaskGroup } from './task-pooler';

const assignedTasks = [];

// task which budget > 0
const fetchAvailableTasks = taskGroupId => {
  return fetchTaskGroup(taskGroupId).then(({ taskGroup }) => {
    return _.filter(taskGroup, task => task.budget > 0);
  });
};

// reserve tasks
const reserveTasks = tasks => {
  _.each(tasks, task => {
    assignedTasks.push(task);
  });
  const taskIds = _.map(tasks, task => task.id);
  return assignTasks(taskIds);
};

// ページから離脱する場合に、確保したtaskを返却する
const unreserveTasks = () => {
  // TODO
};
$(window).on('beforeunload', unreserveTasks);

// タスクが完了した場合は、taskを返却する必要はない
const finishTask = () => {
  $(window).off('beforeunload', unreserveTasks);
  // TODO: notify task is finished
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

export {
  reserveTasks,
  fetchAvailableTasks,
  finishTaskAssginment
};
