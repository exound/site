import React from "react";

export default class Advertisement extends React.Component {
  render() {
    const {advertisement} = this.props;

    return (
      <div className="advertisement">
        <a href={advertisement.url}>
          <img src={advertisement.image} />
        </a>
      </div>
    );
  }
}
