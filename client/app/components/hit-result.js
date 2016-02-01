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
    const hitId = $('HITId').text();
    // TODO: production mode (not sandbox!!!)
    const hitUrl = `https://workersandbox.mturkcontent.com/dynamic/hit?assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE&hitId=${hitId}`

    return (
      <div>
        {
          hitId &&
            (
              <div>
                <a href={ hitUrl } target="_blank">{ hitUrl }</a>
              </div>
            )
        }
        <div className="form-section">
          <label>Raw Result</label>
          <textarea rows="15" cols="80" defaultValue={ $.html() }></textarea>
        </div>
      </div>
    );
  }
}
