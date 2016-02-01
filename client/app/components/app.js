import React from 'react';
import SettingsWindow from './settings-window';
import ResultWindow from './result-window';
import postHIT from '../services/post-hit';
import ConfigService from '../services/config';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWindow: 'settings'
    };
  }
  onPostHIT() {
    const config = ConfigService.getItems();
    postHIT(config).then(result => {
      this.setState({
        currentWindow: 'result',
        result
      });
    }).catch(e => console.log(e));
  }
  render() {
    switch (this.state.currentWindow) {
      case 'settings':
        return <SettingsWindow onPostHIT={ this.onPostHIT.bind(this) } />;
        break;
      case 'result':
        return <ResultWindow result={ this.state.result } />;
        break;
    }
  }
}
