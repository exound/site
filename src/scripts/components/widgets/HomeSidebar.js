import R from "ramda";
import React from "react";

import SidebarBriefings from "./SidebarBriefings";
import RecentComments from "./RecentComments";
import Advertisement from "./Advertisement";

export default class HomeSidebar extends React.Component {
  render() {
    const {
      advertisements,
      comments,
      briefings
    } = this.props;

    const advertisementItems = R.map(advertisement => {
      return <Advertisement key={advertisement.id} advertisement={advertisement} />;
    }, R.values(advertisements));

    const briefingsDisplay = (briefings && briefings.length) ?
          <SidebarBriefings briefings={briefings} /> :
          null;

    const recentComments = (comments && comments.length) ?
          <RecentComments comments={comments} /> :
          null;

    return (
      <aside className="sidebar">
        {advertisementItems[0]}
        {briefingsDisplay}
        {advertisementItems[1]}
        {recentComments}
        {advertisementItems[2]}
      </aside>
    );
  }
};
