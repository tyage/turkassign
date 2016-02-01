import React from 'react';
import { taskPool } from '../../../requester/src/main';

export default class HitResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };
    this.updateTaskPool();
    window.setInterval(() => {
      this.updateTaskPool();
    }, 1000 * 5);
  }
  updateTaskPool() {
    const taskGroupId = this.props.taskGroupId;
    taskPool.getTasks(taskGroupId).then(({ taskGroup }) => {
      this.setState({
        tasks: taskGroup
      })
    });
  }
  render() {
    const taskElems = this.state.tasks.map((task) => {
      return (
        // added task budget to key because it will change
        <section className="task-form" key={ `${task.budget} ${task.id}` }>
          <header>
            <div className="task-name">Task { task.id }</div>
          </header>
          <div className="form-section">
            <label>Budget</label>
            <input type="number" defaultValue={ task.budget } />
          </div>
          <div className="form-section">
            <label>Content</label>
            <textarea rows="3" cols="80" defaultValue={ task.content }></textarea>
          </div>
        </section>
      );
    });

    return (
      <div id="task-forms">
        <p>
          Task Group ID: { this.props.taskGroupId }
        </p>
        { taskElems }
      </div>
    );
  }
}
