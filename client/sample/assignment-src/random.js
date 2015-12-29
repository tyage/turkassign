import taskTemplate from './task-template';

// worker assigned a task which is choosed by random
//
// worker: {
//   id: worker id
// }
//
// taskSet: [
//   {
//     data: task data,
//     budget: remaining budget, // budget should be > 0
//     reserve: reserve this task,
//     unreserve: unreserve this task
//   }
// ]

// TODO: taskSetは後からでも取ってこれるようにしたほうがいい(同一ワーカーのexploitation結果を用いてタスクを割り当てる場合に使えるから)

fetchTaskSet().then(taskSet => {
  const taskId = parseInt(Math.random() * taskSet.length);
  const selectedTask = taskSet[taskId];
  selectedTask.reserve();

  document.getElementById('content').innerHTML = taskTemplate(selectedTask.data.images);
});
