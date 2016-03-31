import React from "react";

import Imager from "./Imager";

export default class StaffCell extends React.Component {
  render() {
    const {
      staff
    } = this.props;

    const {
      portrait,
      name,
      title,
      biography
    } = staff;

    return (
      <div className="staff cell">
        <Imager url={portrait} className="portrait" />
        <h2>{name}</h2>
        <h3>{title}</h3>
        <p>{biography}</p>
      </div>
    );
  }
}
