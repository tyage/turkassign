import React from 'react';
import Config from './config';
import Algorithm from './algorithm';

export default class ResultWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingTab: 'config'
    };
  }
  changeSettingTab(tab) {
    this.setState({
      settingTab: tab
    });
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
        case 'tasks':
          return 1;
          break;
      }
    };
    const NavItem = ({ name, title, on }) => {
      const classNames = ['nav-group-item'];
      if (this.state.settingTab === name) {
        classNames.push('active');
      }
      return (
        <div className={ classNames.join(' ') }
          onClick={ this.changeNavItem.bind(this, name) }>{ title }</div>
      );
    };

    return (
      <div className="window">
        <div className="window-content">
          <div className="pane-group" id="settings">
            <div className="pane-sm sidebar">
              <div className="nav-group">
                <h5 className="nav-group-title">Settings</h5>
                <NavItem name="config" title="Config" />
                <NavItem name="algorithm" title="Algorithm" />
                <NavItem name="tasks" title="Tasks" />
              </div>
              <div className="nav-group">
                <h5 className="nav-group-title">Result</h5>
                <NavItem name="config" title="Config" />
              </div>
            </div>
            <div className="pane">
              { showSettingContent() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
