import React from 'react';

export default class NavGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: props.defaultItem
    };
  }
  onItemChange(item) {
    this.setState({
      activeItem: item
    });
    this.props.onItemChange(item);
  }
  render() {
    const NavItem = ({ name, title }) => {
      const classNames = ['nav-group-item'];
      if (this.state.activeItem === name) {
        classNames.push('active');
      }
      return (
        <div className={ classNames.join(' ') }
          onClick={ this.onItemChange.bind(this, name) }>{ title }</div>
      );
    };
    const NavGroup = ({ title, items }) => {
      const itemElems = items.map((item, i) => {
        return <NavItem name={ item.name } title={ item.title } key={ i } />;
      });
      return (
        <div className="nav-group">
          <h5 className="nav-group-title">{ title }</h5>
          { itemElems }
        </div>
      );
    };
    const navGroups = Object.keys(this.props.groups).map((groupName, i) => {
      const items = this.props.groups[groupName];
      return <NavGroup title={ groupName } items={ items } key={ i } />;
    });

    return (
      <div className="pane-sm sidebar">
        { navGroups }
      </div>
    );
  }
}
