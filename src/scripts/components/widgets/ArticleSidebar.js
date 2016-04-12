import R from "ramda";
import React from "react";

import SidebarBriefings from "./SidebarBriefings";
import Advertisement from "./Advertisement";

export default class ArticleSidebar extends React.Component {
  render() {
    const {
      advertisements,
      briefings
    } = this.props;

    const advertisementItems = R.mapObj(advertisement => {
      return <Advertisement className="square" advertisement={advertisement} />;
    }, advertisements);

    const briefingsDisplay = (briefings && briefings.length) ?
          <SidebarBriefings briefings={briefings} /> :
          null;

    return (
      <aside className="sidebar">
        {advertisementItems.position4}
        {briefingsDisplay}
        {advertisementItems.position7}
      </aside>
    );
  }
};
