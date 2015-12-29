import fetch from 'node-fetch';
import config from './config';

class TaskPooler {
  getEndpoint() {
    reuturn config.get('taskPoolerAddress');
  }
  setTasksAndAlgorithm(taskSet, algorithm) {
    return fetch(`${this.getEndpoint()}/set`, {
      method: 'PUT',
      body: JSON.stringify({
        taskSet,
        algorithm
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json();
    });
  }
}

export default new TaskPooler();
