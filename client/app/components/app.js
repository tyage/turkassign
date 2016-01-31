import React from 'react';
import SettingsWindow from './settings-window';
import ResultWindow from './result-window';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWindow: 'settings'
    };
  }
  onPostHIT(settings) {
    // XXX: post hit with current settings
    const result = {};

    this.setState({
      currentWindow: 'result',
      result
    });
  }
  render() {
    switch (this.state.currentWindow) {
      case 'settings':
        return <SettingsWindow onPostHIT={ this.onPostHIT.bind(this) } />;
        break;
      case 'result':
        return <ResultWindow settings={ this.state.settings } />;
        break;
    }
  }
}
