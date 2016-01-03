import $ from 'jquery';
import _ from 'lodash';
import Task from './task';

const tasks = [];
const registerNewTask = task => {
  tasks.push(task);
};

// ページから離脱する場合に、確保したtaskを返却する
const unreserveTasks = () => {
  _.each(tasks, task => {
    if (task.isReserved) {
      task.unreserve({
        async: false
      });
    }
  });
};
$(window).on('beforeunload', unreserveTasks);

// タスクが完了した場合は、taskを返却する必要はない
const finishTask = () => {
  $(window).off('beforeunload', unreserveTasks);
};

// fetch all tasks
const fetchTaskSet = taskSetId => {
  // XXX: taskPoolerAddressは埋め込まれたaddressから取ってくる
  const path = `${window.taskPoolerAddress}/list/${taskSetId}`;
  return $.getJSON(path).then(({ taskSet }) => {
    return _.map(taskSet, (taskData, i) => {
      const task = new Task(taskData, taskSetId, i);
      registerNewTask(task);
      return task;
    });
  });
};

// task which budget > 0
const fetchAvailableTaskSet = taskSetId => {
  return window.fetchTaskSet(taskSetId).then(taskSet => {
    return _.filter(taskSet, task => task.budget > 0);
  });
};

export {
  registerNewTask,
  unreserveTasks,
  finishTask,
  fetchAvailableTaskSet,
  fetchTaskSet
};
