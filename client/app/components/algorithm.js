import React from 'react';

export default class Algorithm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="form-section">
          <label>Assignment Algorithm</label>
          <textarea rows="15" cols="60"></textarea>
        </div>
      </div>
    );
  }
}
