import fetch from 'node-fetch';
import FormData from 'form-data';
import querystring from 'querystring';
import config from './config';

class TaskPool {
  getEndpoint() {
    return config.get('taskPoolAddress');
  }
  setTasks(tasks) {
    return fetch(`${this.getEndpoint()}/set`, {
      method: 'PUT',
      body: querystring.stringify({
        tasks: JSON.stringify(tasks)
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      return res.json();
    });
  }
  getTasks(taskGroupId) {
    return fetch(`${this.getEndpoint()}/list/${taskGroupId}`).then(res => {
      return res.json();
    });
  }
  uploadFile(file) {
    const form = new FormData();
    form.append('file', file);
    return fetch(`${this.getEndpoint()}/upload`, {
      method: 'PUT',
      body: form,
      headers: form.getHeaders()
    }).then(res => {
      return res.json();
    });
  }
}

export default new TaskPool();
