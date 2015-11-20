import React from "react";

import Link from "./Link";

export default class MenuItem extends React.Component {
  render() {
    const {link, children} = this.props;

    return (
      <div className="item">
        <Link to={link}>{children}</Link>
      </div>
    );
  }
}
