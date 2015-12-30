import $ from 'jquery';
import _ from 'lodash';
import Task from './task';

const fetchTaskSet = taskSetId => {
  // XXX: taskPoolerAddressは埋め込まれたaddressから取ってくる
  const path = `${window.taskPoolerAddress}/list/${taskSetId}`;
  return $.getJSON(path).then(({ taskSet }) => {
    return _.map(taskSet, taskData => {
      const task = new Task(taskData, taskSetId, i);
      return task;
    });
  });
};

// task which budget > 0
const fetchAvailabeleTaskSet = taskSetId => {
  return window.fetchTaskSet(taskSetId).then(taskSet => {
    return _.filter(taskSet, task => task.budget > 0);
  });
};

export default {
  fetchAvailabeleTaskSet,
  fetchTaskSet
};
