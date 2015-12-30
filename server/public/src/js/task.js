import $ from 'jquery';

export default class Task {
  constructor(data, taskSetId, index) {
    this.data = data;
    this.budget = data.budget;

    this.taskSetId = taskSetId;
    this.index = index;

    this.isReserved = false;
  }
  reserve() {
    if (this.isReserved) {
      // task can reserved only once!
      return;
    }

    this.isReserved = true;

    return $.ajax({
      url: `${window.taskPoolerAddress}/reserve`,
      method: 'POST',
      data: {
        taskSetId: this.taskSetId,
        index: this.index
      }
    });
  }
  unreserve() {
    if (!this.isReserved) {
      // task is not reserved yet.
      return;
    }

    this.isReserved = false;

    return $.ajax({
      url: `${window.taskPoolerAddress}/unreserve`,
      method: 'POST',
      data: {
        taskSetId: this.taskSetId,
        index: this.index
      }
    });
  }
}
