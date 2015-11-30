import React from "react";

import Link from "./Link";

export default class Advertisement extends React.Component {
  render() {
    const {advertisement} = this.props;

    return (
      <div className="advertisement">
        <Link to={advertisement.url}>
          <img src={advertisement.image} />
        </Link>
      </div>
    );
  }
}
