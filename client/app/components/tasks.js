import React from 'react';
import ConfigService from '../services/config';

export default class Algorithm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: ConfigService.get('tasks') || []
    };
  }
  onChange() {
  }
  onDeleteTask(i) {
    this.state.tasks.splice(i, 1);
    this.setState({
      tasks: this.state.tasks
    });
  }
  onAddTask() {
    this.state.tasks.push({
      limit: 0,
      content: ''
    });
    this.setState({
      tasks: this.state.tasks
    });
  }
  render() {

    const taskElems = this.state.tasks.map((task, i) => {
      return (
        <section className="task-form" key={ i }>
          <header>
            <h5>Task { i }</h5>
            <button className="btn btn-mini btn-negative"
              onClick={ this.onDeleteTask.bind(this, i) }>Delete this</button>
          </header>
          <div className="form-section">
            <label>Limit</label>
            <input type="text" />
          </div>
          <div className="form-section">
            <label>Content</label>
            <textarea rows="3" cols="80"
              onChange={ this.onChange.bind(this) }
              defaultValue={ ConfigService.get('algorithm') }
              ></textarea>
          </div>
        </section>
      );
    });

    return (
      <div>
        <button className="btn btn-mini btn-primary" onClick={ this.onAddTask.bind(this) }>Add task</button>
        { taskElems }
      </div>
    );
  }
}
