import fetch from 'node-fetch';
import config from './config';

class TaskPooler {
  setTasks(tasks) {
    const taskPoolerAddress = config.get('taskPoolerAddress');
    return fetch(taskPoolerAddress, {
      method: 'PUT',
      body: JSON.stringify(tasks)
    });
  }
}

export default new TaskPooler();
