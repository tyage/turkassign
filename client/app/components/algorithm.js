import React from 'react';
import ConfigService from '../services/config';

export default class Algorithm extends React.Component {
  constructor(props) {
    super(props);
  }
  onChange(e) {
    ConfigService.set('algorithm', e.target.value);
  }
  render() {
    return (
      <div>
        <div className="form-section">
          <label>Assignment Algorithm</label>
          <textarea rows="30" cols="80"
            disabled={ this.props.disabled }
            onChange={ this.onChange }
            defaultValue={ ConfigService.get('algorithm') }
            ></textarea>
        </div>
      </div>
    );
  }
}
