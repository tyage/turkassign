export default class Task {
  constructor(data, index) {
    this.data = data;
    this.budget = data.budget;
    this.index = index;
  }
  reserve() {
    return $.ajax({
      url: `${taskPoolerAddress}/reserve`,
      data: {
        taskSetId,
        index: this.index
      }
    });
  }
  unreserve() {
    return $.ajax({
      url: `${taskPoolerAddress}/unreserve`,
      data: {
        taskSetId,
        index: this.index
      }
    });
  }
}
