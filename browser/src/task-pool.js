import $ from 'jquery';

// taskPoolAddressは埋め込まれたaddressから取ってくる
const endpoint = window.taskPoolAddress;

const assignTasks = taskIds => {
  return $.ajax({
    url: `${endpoint}/assign`,
    method: 'POST',
    type: 'json',
    data: {
      taskIds
    }
  });
};

const fetchTaskGroup = (taskGroupId = window.taskGroupId) => {
  const path = `${endpoint}/list/${taskGroupId}`;
  return $.getJSON(path);
};

const finishAssignments = assignmentIds => {
  return $.ajax({
    url: `${endpoint}/finish`,
    method: 'POST',
    type: 'json',
    data: {
      assignmentIds
    }
  });
};

const cancelAssignments = assignmentIds => {
  return $.ajax({
    url: `${endpoint}/cancel`,
    method: 'POST',
    type: 'json',
    data: {
      assignmentIds
    }
  });
};

export {
  assignTasks,
  fetchTaskGroup,
  finishAssignments,
  cancelAssignments
};
