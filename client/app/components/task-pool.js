import React from 'react';

export default class HitResult extends React.Component {
  constructor(props) {
    super(props);
  }
  onChange(e) {
    ConfigService.set('algorithm', e.target.value);
  }
  render() {
    const taskGroupId = this.props.taskGroupId;

    return (
      <div>
        { taskGroupId }
      </div>
    );
  }
}
