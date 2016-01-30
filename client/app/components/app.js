import React from 'react';
import Settings from './settings';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="window">
        <div className="window-content">
          <Settings />
        </div>
      </div>
    );
  }
}
