import $ from 'jquery';

window.fetchTaskSet = () => {
  const path = `${taskPoolerAddress}/list/${taskSetId}`;
  return $.getJSON(path).then(({ taskSet }) => {
    return taskSet;
  });
};
