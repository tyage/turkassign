import React from 'react';
import Config from './config';
import Algorithm from './algorithm';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingTab: 'config'
    };
  }
  changeSettingTab(tab) {
    this.setState({
      settingTab: tab
    })
  }
  render() {
    const showSettingContent = () => {
      switch (this.state.settingTab) {
        case 'config':
          return <Config />;
          break;
        case 'algorithm':
          return <Algorithm />;
          break;
        case 'task':
          return 1;
          break;
      }
    };
    const SettingsItem = ({ name, title }) => {
      const classNames = ['nav-group-item'];
      if (this.state.settingTab === name) {
        classNames.push('active');
      }
      return (
        <div className={ classNames.join(' ') }
          onClick={ this.changeSettingTab.bind(this, name) }>{ title }</div>
      );
    };

    return (
      <div className="pane-group" id="settings">
        <div className="pane-sm sidebar">
          <div className="nav-group">
            <h5 className="nav-group-title">Settings</h5>
            <SettingsItem name="config" title="Config" />
            <SettingsItem name="algorithm" title="Algorithm" />
            <SettingsItem name="task" title="Task" />
          </div>
        </div>
        <div className="pane">
          { showSettingContent() }
        </div>
      </div>
    );
  }
}
