import $ from 'jquery';

// taskPoolerAddressは埋め込まれたaddressから取ってくる
const endpoint = window.taskPoolerAddress;

const assignTasks = taskIds => {
  return $.ajax({
    url: `${endpoint}/assign`,
    method: 'POST',
    data: {
      taskIds
    }
  });
};

const fetchTaskGroup = (taskGroupId = window.taskGroupId) => {
  const path = `${endpoint}/list/${taskGroupId}`;
  return $.getJSON(path);
};

export {
  assignTasks,
  fetchTaskGroup
};
