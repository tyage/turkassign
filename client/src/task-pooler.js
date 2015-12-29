import fetch from 'node-fetch';
import config from './config';

class TaskPooler {
  setTasks(tasks) {
    const taskPoolerAddress = config.get('taskPoolerAddress');
    return fetch(`${taskPoolerAddress}/set`, {
      method: 'PUT',
      body: JSON.stringify(tasks)
    }).then(res => {
      return res.json();
    });
  }
}

export default new TaskPooler();
