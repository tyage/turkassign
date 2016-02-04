import React from 'react';
import ConfigService from '../services/config';

export default class Algorithm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: ConfigService.get('tasks') || []
    };
  }
  saveTasks() {
    const tasks = this.state.tasks;
    this.setState({
      tasks
    });
    ConfigService.set('tasks', tasks);
  }
  changeTask(i, key, e) {
    this.state.tasks[i][key] = e.target.value;
    this.saveTasks();
  }
  deleteTask(i) {
    this.state.tasks.splice(i, 1);
    this.saveTasks();
  }
  addTask() {
    const maxId = Math.max(0, ...this.state.tasks.map(task => task.id));
    this.state.tasks.push({
      budget: 0,
      content: '',
      id: maxId + 1
    });
    this.saveTasks();
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
                    onClick={ this.deleteTask.bind(this, i) }>Delete this</button>
                </div>
              )
            }
          </header>
          <div className="form-section">
            <label>Budget</label>
            <input type="number" defaultValue={ task.budget }
              min="0" disabled={ this.props.disabled }
              onChange={ this.changeTask.bind(this, i, 'budget') } />
          </div>
          <div className="form-section">
            <label>Content</label>
            <textarea rows="3" cols="80"
              defaultValue={ task.content }
              disabled={ this.props.disabled }
              onChange={ this.changeTask.bind(this, i, 'content') }
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
                onClick={ this.addTask.bind(this) }>Add task</button>
            </div>
          )
        }
        { taskElems }
      </div>
    );
  }
}
