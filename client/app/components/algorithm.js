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
          <textarea rows="30" cols="80" disabled={ this.props.disabled }></textarea>
        </div>
      </div>
    );
  }
}
