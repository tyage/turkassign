import React from 'react';
import Config from './config';
import Algorithm from './algorithm';
import Tasks from './tasks';
import HitConfig from './hit-config';
import NavGroups from './nav-groups';

const defaultActiveNavItem = 'config';

export default class SettingsWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNavItem: defaultActiveNavItem
    };
  }
  onNavItemChange(item) {
    this.setState({
      activeNavItem: item
    });
  }
  onPostHIT() {
    this.props.onPostHIT();
  }
  render() {
    const showContent = () => {
      switch (this.state.activeNavItem) {
        case 'config':
          return <Config />;
          break;
        case 'algorithm':
          return <Algorithm />;
          break;
        case 'tasks':
          return <Tasks />;
          break;
        case 'hitConfig':
          return <HitConfig />;
          break;
      }
    };

    const navGroups = {
      'Settings': [
        { name: 'config', title: 'Config' },
        { name: 'algorithm', title: 'Algorithm' },
        { name: 'tasks', title: 'Tasks' },
        { name: 'hitConfig', title: 'HIT Config' },
      ]
    };

    return (
      <div className="window">
        <div className="window-content">
          <div className="pane-group">
            <NavGroups groups={ navGroups } onItemChange={ this.onNavItemChange.bind(this) }
              defaultItem={ defaultActiveNavItem } />
            <div className="pane" id="content-pane">
              { showContent() }
            </div>
          </div>
        </div>
        <footer className="toolbar toolbar-footer">
          <div className="toolbar-actions">
            <button className="btn btn-default">
              Cancel
            </button>

            <button className="btn btn-primary pull-right"
              onClick={ this.onPostHIT.bind(this) }>
              Post
            </button>
          </div>
        </footer>
      </div>
    );
  }
}
