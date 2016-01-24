import fetch from 'node-fetch';
import FormData from 'form-data';
import config from './config';

class TaskPooler {
  getEndpoint() {
    return config.get('taskPoolerAddress');
  }
  setTasks(tasks) {
    const params = {
      tasks: JSON.stringify(tasks)
    };
    const param = Object.keys(params).map((k) => `${k}=${encodeURIComponent(params[k])}`).join('&');

    return fetch(`${this.getEndpoint()}/set`, {
      method: 'PUT',
      body: param,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
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

export default new TaskPooler();
