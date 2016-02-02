import React from "react";

import Link from "./Link";

export default class MenuItem extends React.Component {
  render() {
    const {link, children} = this.props;

    const childEls = link ?
          <Link to={link}>{children}</Link> :
          <span>{children}</span>;

    return <div className="item">{childEls}</div>;
  }
}
