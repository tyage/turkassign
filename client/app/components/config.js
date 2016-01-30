import React from 'react';
import ConfigService from '../services/config';

export default class Config extends React.Component {
  onConfigChange() {
    ConfigService.set('awsAccessKeyId', this.refs.awsAccessKeyId.value);
    ConfigService.set('awsSecretAccessKey', this.refs.awsSecretAccessKey.value);
    ConfigService.set('mturkEndpoint', this.refs.mturkEndpoint.value);
    ConfigService.set('taskPoolAddress', this.refs.taskPoolAddress.value);
  }
  render() {
    return (
      <div id="config-form">
        <div className="form-section">
          <label>AWS Access Key ID</label>
          <input type="text" placeholder="AWS Access Key ID"
            ref="awsAccessKeyId"
            onChange={ this.onConfigChange.bind(this) }
            defaultValue={ ConfigService.get('awsAccessKeyId') } />
        </div>
        <div className="form-section">
          <label>AWS Secret Access Key</label>
          <input type="password" placeholder="AWS Secret Access Key"
            ref="awsSecretAccessKey"
            onChange={ this.onConfigChange.bind(this) }
            defaultValue={ ConfigService.get('awsSecretAccessKey') } />
        </div>
        <div className="form-section">
          <label>MTurk Endpoint</label>
          <input type="text" placeholder="Amazon Mechanical Turk API Endpoint"
            ref="mturkEndpoint"
            onChange={ this.onConfigChange.bind(this) }
            defaultValue={ ConfigService.get('mturkEndpoint') } />
        </div>
        <div className="form-section">
          <label>Address of Task Pool</label>
          <input type="text" placeholder="Address of Task Pool"
            ref="taskPoolAddress"
            onChange={ this.onConfigChange.bind(this) }
            defaultValue={ ConfigService.get('taskPoolAddress') } />
        </div>
      </div>
    );
  }
}
