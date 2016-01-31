import React from 'react';
import SettingsWindow from './settings-window';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWindow: 'settings'
    };
  }
  onPostHIT() {
    this.setState({
      currentWindow: 'result'
    });
  }
  render() {
    switch (this.state.currentWindow) {
      case 'settings':
        return <SettingsWindow onPostHIT={ this.onPostHIT.bind(this) } />;
        break;
      case 'result':
        return <ResultWindow />;
        break;
    }
  }
}
