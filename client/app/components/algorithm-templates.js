import React from 'react';
import ConfigService from '../services/config';

export default class AlgorithmTemplates extends React.Component {
  constructor(props) {
    super(props);

    const algorithmTemplates = ConfigService.get('algorithmTemplates') || [];
    const length = algorithmTemplates.length;
    this.state = {
      algorithmTemplates,
      activeTemplate: length > 0 && algorithmTemplates[0]
    };
  }
  saveTemplates() {
    const algorithmTemplates = this.state.algorithmTemplates;
    this.setState({
      algorithmTemplates
    });

    ConfigService.set('algorithmTemplates', algorithmTemplates);
  }
  changeTemplate(template, key, e) {
    template[key] = e.target.value;
    this.saveTemplates();
  }
  addNewTemplate() {
    const maxId = Math.max(0, ...this.state.algorithmTemplates.map(template => template.id));
    this.state.algorithmTemplates.push({
      title: 'new template',
      content: '',
      id: maxId + 1
    });
    this.saveTemplates();
  }
  showTemplate(template) {
    this.refs.templateContent.value = template.content;
    this.refs.templateTitle.value = template.title;
    this.setState({
      activeTemplate: template
    });
  }
  render() {
    const algorithmTemplateElems = this.state.algorithmTemplates
      .sort((a, b) => b.id - a.id)
      .map((template, i) => {
        const classNames = ['list-group-item'];
        if (template === this.state.activeTemplate) {
          classNames.push('active');
        }

        return (
          <li className={ classNames.join(' ') } key={ template.id }
            onClick={ this.showTemplate.bind(this, template) }>
            <div className="media-body">
              <p>{ template.title }</p>
            </div>
          </li>
        );
      });

    const activeTemplate = this.state.activeTemplate;

    return (
      <div>
        <div className="pane-group">
          <div className="pane pane-sm sidebar">
            <ul className="list-group">
              <li className="list-group-header">
                <button className="btn btn-primary" onClick={ this.addNewTemplate.bind(this) }>
                  Add new algorithm template
                </button>
              </li>
              { algorithmTemplateElems }
            </ul>
          </div>
          <div className="pane content-pane" id="algorithm-template-form">
            { activeTemplate && (
                <div>
                  <div className="form-section">
                    <label>Title</label>
                    <input type="text"
                      disabled={ this.props.disabled }
                      onChange={ this.changeTemplate.bind(this, activeTemplate, 'title') }
                      defaultValue={ activeTemplate.title }
                      ref="templateTitle" />
                  </div>
                  <div className="form-section">
                    <label>Algorithm</label>
                    <textarea rows="30" cols="80"
                      disabled={ this.props.disabled }
                      onChange={ this.changeTemplate.bind(this, activeTemplate, 'content') }
                      defaultValue={ activeTemplate.content }
                      ref="templateContent"
                      ></textarea>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}
