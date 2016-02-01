import React from 'react';
import ConfigService from '../services/config';

let nextId = 0;

export default class Algorithm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: ConfigService.get('tasks') || []
    };
    this.state.tasks.forEach(task => {
      if (task.id >= nextId) {
        nextId = task.id + 1;
      }
    });
  }
  updateTasks() {
    const tasks = this.state.tasks;
    this.setState({
      tasks: tasks
    });
    ConfigService.set('tasks', tasks);
  }
  onTaskChange(i, key, e) {
    this.state.tasks[i][key] = e.target.value;
    this.updateTasks();
  }
  onDeleteTask(i) {
    this.state.tasks.splice(i, 1);
    this.updateTasks();
  }
  onAddTask() {
    ++nextId;
    this.state.tasks.push({
      budget: 0,
      content: '',
      id: nextId
    });
    this.updateTasks();
  }
  render() {
    const taskElems = this.state.tasks.map((task, i) => {
      return (
        <section className="task-form" key={ task.id }>
          <header>
            <div className="task-name">Task { i }</div>
            {
              !this.props.disabled && (
                <div className="task-actions">
                  <button className="btn btn-mini btn-negative"
                    onClick={ this.onDeleteTask.bind(this, i) }>Delete this</button>
                </div>
              )
            }
          </header>
          <div className="form-section">
            <label>Budget</label>
            <input type="number" defaultValue={ task.budget }
              min="0" disabled={ this.props.disabled }
              onChange={ this.onTaskChange.bind(this, i, 'budget') } />
          </div>
          <div className="form-section">
            <label>Content</label>
            <textarea rows="3" cols="80"
              defaultValue={ task.content }
              disabled={ this.props.disabled }
              onChange={ this.onTaskChange.bind(this, i, 'content') }
              ></textarea>
          </div>
        </section>
      );
    });

    return (
      <div id="task-forms">
        {
          !this.props.disabled && (
            <div id="tasks-actions">
              <button className="btn btn-mini btn-primary"
                onClick={ this.onAddTask.bind(this) }>Add task</button>
            </div>
          )
        }
        { taskElems }
      </div>
    );
  }
}
