import R from "ramda";
import React from "react";
import Advertisement from "./Advertisement";

export default class HomeSidebar extends React.Component {
  render() {
    const advertisements = R.mapObj(advertisement => {
      return <Advertisement advertisement={advertisement} />;
    }, this.props.advertisements);

    return (
      <aside className="sidebar">
        {advertisements.position1}
        {advertisements.position2}
      </aside>
    );
  }
};
