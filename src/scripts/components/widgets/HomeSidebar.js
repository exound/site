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

    const advertisementItems = R.map(advertisement => {
      return <Advertisement key={advertisement.id} advertisement={advertisement} />;
    }, R.values(advertisements));

    const briefingsDisplay = (briefings && briefings.length) ?
          <SidebarBriefings briefings={briefings} /> :
          null;

    return (
      <aside className="sidebar">
        {advertisementItems}
        {briefingsDisplay}
      </aside>
    );
  }
};
