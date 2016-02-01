import React from 'react';
import ConfigService from '../services/config';

const configItems = [
  {
    label: 'Title',
    placeholder: 'Title of HIT',
    key: 'hitTitle'
  },
  {
    label: 'MaxAssignment',
    placeholder: 'Max assignment of HIT',
    key: 'hitMaxAssignment',
    type: 'number'
  },
  {
    label: 'Description',
    placeholder: 'Description of HIT',
    key: 'hitDescription'
  },
  {
    label: 'AssignmentDurationInSeconds',
    placeholder: 'Assignment duration in seconds of HIT',
    key: 'hitAssignmentDurationInSeconds',
    type: 'number'
  },
  {
    label: 'LifetimeInSeconds',
    placeholder: 'Lifetime in seconds of HIT',
    key: 'hitLifetimeInSeconds',
    type: 'number'
  },
  {
    label: 'RewardAmount',
    placeholder: 'Reward amount of HIT',
    key: 'hitRewardAmount',
    type: 'number'
  },
  {
    label: 'RewardCurrencyCode',
    placeholder: 'Reward currency code of HIT',
    key: 'hitRewardCurrencyCode'
  },
];

export default class HitConfig extends React.Component {
  onConfigChange(key, e) {
    ConfigService.set(key, e.target.value);
  }
  render() {
    const itemElems = configItems.map((item, i) => {
      return (
        <div className="form-section" key={ i }>
          <label>{ item.label }</label>
          <input type={ item.type || 'text' } placeholder={ item.placeholder }
            onChange={ this.onConfigChange.bind(this, item.key) }
            defaultValue={ ConfigService.get(item.key) }
            disabled={ this.props.disabled } />
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
