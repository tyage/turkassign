import React from 'react';
import ConfigService from '../services/config';

const configItems = [
  {
    label: 'AWS Access Key ID',
    placeholder: 'AWS Access Key ID',
    key: 'awsAccessKeyId'
  },
  {
    label: 'AWS Secret Access Key',
    placeholder: 'AWS Secret Access Key',
    key: 'awsSecretAccessKey'
  },
  {
    label: 'MTurk Endpoint',
    placeholder: 'Amazon Mechanical Turk API Endpoint',
    key: 'mturkEndpoint'
  },
  {
    label: 'Address of Task Pool',
    placeholder: 'Address of Task Pool',
    key: 'taskPoolAddress'
  }
];

export default class Config extends React.Component {
  onConfigChange(key, e) {
    ConfigService.set(key, e.target.value);
  }
  render() {
    const itemElems = configItems.map((item, i) => {
      return (
        <div className="form-section" key={ i }>
          <label>{ item.label }</label>
          <input type="text" placeholder={ item.placeholder }
            onChange={ this.onConfigChange.bind(this, item.key) }
            defaultValue={ ConfigService.get(item.key) } />
        </div>
      );
    });
    return (
      <div id="config-form">
        { itemElems }
      </div>
    );
  }
}
