import ReactDOM from 'react-dom';
import React from 'react';
import Config from './config';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Config />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
