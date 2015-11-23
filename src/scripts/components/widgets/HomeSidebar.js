import R from "ramda";
import React from "react";

import SidebarBriefings from "./SidebarBriefings";
import Advertisement from "./Advertisement";

export default class HomeSidebar extends React.Component {
  render() {
    const {
      advertisements,
      briefings
    } = this.props;

    const advertisementItems = R.mapObj(advertisement => {
      return <Advertisement advertisement={advertisement} />;
    }, advertisements);

    const briefingsDisplay = briefings && briefings.length &&
          <SidebarBriefings briefings={briefings} />;

    return (
      <aside className="sidebar">
        {advertisementItems.position1}
        {advertisementItems.position2}
        {briefingsDisplay}
      </aside>
    );
  }
};
