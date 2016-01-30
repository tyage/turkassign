import React from 'react';
import Settings from './settings';
import PostForm from './post-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="window">
        <div className="window-content">
          <Settings />
          <div id="main-content">
            <PostForm />
          </div>
        </div>
      </div>
    );
  }
}
