import $ from 'jquery';
import Task from './task';

window.fetchTaskSet = () => {
  const path = `${taskPoolerAddress}/list/${taskSetId}`;
  return $.getJSON(path).then(({ taskSet: rawTaskSet }) => {
    const taskSet = [];
    for (let i = 0, l = rawTaskSet.length; i < l; ++i) {
      taskSet.push(new Task(rawTaskSet[i]));
    }
    return taskSet;
  });
};
