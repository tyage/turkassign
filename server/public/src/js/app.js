import $ from 'jquery';
import Task from './task';

window.fetchTaskSet = () => {
  const path = `${taskPoolerAddress}/list/${taskSetId}`;
  return $.getJSON(path).then(({ taskSet: rawTaskSet }) => {
    const taskSet = [];
    for (let i = 0, l = rawTaskSet.length; i < l; ++i) {
      taskSet.push(new Task(rawTaskSet[i], i));
    }
    return taskSet;
  });
};

// task which budget > 0
window.fetchAvailabeleTaskSet = () => {
  return window.fetchTaskSet().then(taskSet => {
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
