import fetch from 'node-fetch';
import config from './config';

class TaskPooler {
  getEndpoint() {
    reuturn config.get('taskPoolerAddress');
  }
  setTasks(tasks) {
    return fetch(`${this.getEndpoint()}/set`, {
      method: 'PUT',
      body: JSON.stringify(tasks),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json();
    });
  }
  upload(content) {
    return fetch(`${this.getEndpoint()}/upload`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json();
    });
  }
}

export default new TaskPooler();
