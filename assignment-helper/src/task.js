import $ from 'jquery';
import _ from 'lodash';

export default class Task {
  constructor(data, taskSetId, index) {
    this.data = data;
    this.budget = data.budget;

    this.taskSetId = taskSetId;
    this.index = index;

    this.isReserved = false;
  }
  reserve(settings) {
    if (this.isReserved) {
      // task can reserved only once!
      return;
    }

    this.isReserved = true;

    settings = _.merge({
      url: `${window.taskPoolerAddress}/reserve`,
      method: 'POST',
      data: {
        taskSetId: this.taskSetId,
        index: this.index
      }
    }, settings);
    return $.ajax(settings);
  }
  unreserve(settings) {
    if (!this.isReserved) {
      // task is not reserved yet.
      return;
    }

    this.isReserved = false;

    settings = _.merge({
      url: `${window.taskPoolerAddress}/unreserve`,
      method: 'POST',
      data: {
        taskSetId: this.taskSetId,
        index: this.index
      }
    }, settings);
    return $.ajax(settings);
  }
}
