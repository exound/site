import React from "react";
import List from "./List";

export default class SubMenu extends React.Component {
  render() {
    return (
      <div className="menu-item">
        <span>{this.props.name}</span>
        <List>{this.props.children}</List>
      </div>
    );
  }
}
