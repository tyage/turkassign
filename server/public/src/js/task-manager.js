import $ from 'jquery';
import Task from './task';

const fetchTaskSet = (taskSetId) => {
  // XXX: taskPoolerAddressは埋め込まれたaddressから取ってくる
  const path = `${window.taskPoolerAddress}/list/${taskSetId}`;
  return $.getJSON(path).then(({ taskSet: rawTaskSet }) => {
    const taskSet = [];
    for (let i = 0, l = rawTaskSet.length; i < l; ++i) {
      const task = new Task(rawTaskSet[i], taskSetId, i);
      taskSet.push(task);
    }
    return taskSet;
  });
};

// task which budget > 0
const fetchAvailabeleTaskSet = (taskSetId) => {
  return window.fetchTaskSet(taskSetId).then(taskSet => {
    const filteredTaskSet = [];
    for (let i = 0, l = taskSet.length; i < l; ++i) {
      const task = taskSet[i];
      if (task.budget > 0) {
        filteredTaskSet.push(task);
      }
    }
    return filteredTaskSet;
  });
};

export default {
  fetchAvailabeleTaskSet,
  fetchTaskSet
};
