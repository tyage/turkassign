import React from 'react';

export default class HitResult extends React.Component {
  constructor(props) {
    super(props);
  }
  onChange(e) {
    ConfigService.set('algorithm', e.target.value);
  }
  render() {
    const $ = this.props.result;

    return (
      <div>
        <div className="form-section">
          <label>Raw Result</label>
          <textarea rows="30" cols="80" defaultValue={ $.html() }></textarea>
        </div>
      </div>
    );
  }
}
