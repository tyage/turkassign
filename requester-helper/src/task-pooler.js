import fetch from 'node-fetch';
import FormData from 'form-data';
import config from './config';

class TaskPooler {
  getEndpoint() {
    return config.get('taskPoolerAddress');
  }
  setTasksAndAlgorithm(taskSet, algorithm) {
    const form = new FormData();
    form.append('taskSet', JSON.stringify(taskSet));
    form.append('algorithm', algorithm);

    return fetch(`${this.getEndpoint()}/set`, {
      method: 'PUT',
      body: form,
      headers: form.getHeaders()
    }).then(res => {
      return res.json();
    });
  }
}

export default new TaskPooler();
