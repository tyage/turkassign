import $ from 'jquery';

window.fetchTaskSet = () => {
  const path = `${taskPoolerAddress}/list/${taskSetId}`;
  $.getJSON(path).then(({ taskSet }) => {
    return taskSet;
  });
};
