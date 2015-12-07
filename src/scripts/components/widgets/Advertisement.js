import React from "react";
import classNames from "classnames";

import Link from "./Link";

export default class Advertisement extends React.Component {
  render() {
    const {
      advertisement,
      className
    } = this.props;

    return (
      <div className={classNames("chshgg", className)}>
        <Link to={advertisement.url}>
          <img src={advertisement.image} />
        </Link>
      </div>
    );
  }
}
