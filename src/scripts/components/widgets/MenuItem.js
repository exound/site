import React from "react";
import {Link} from "react-router";

export default class MenuItem extends React.Component {
  render() {
    const {link, children} = this.props;

    return (
      <div className="menu-item">
        <Link to={link}>{children}</Link>
      </div>
    );
  }
}
