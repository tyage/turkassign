import $ from 'jquery';

export default class Task {
  constructor(data, index) {
    this.data = data;
    this.budget = data.budget;
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
      url: `${taskPoolerAddress}/reserve`,
      method: 'POST',
      data: {
        taskSetId,
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
      url: `${taskPoolerAddress}/unreserve`,
      method: 'POST',
      data: {
        taskSetId,
        index: this.index
      }
    });
  }
}
