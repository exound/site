import React from "react";

import Link from "./Link";
import List from "./List";
import {fromNow} from "../../core/date";

export default class SidebarBriefings extends React.Component {
  render() {
    const {
      briefings
    } = this.props;

    const briefingsItems = briefings.map(({
      id, title, url, user, created_at
    }) => {
      return (
        <div className="briefing" key={id}>
          <h3 className="title">
            <Link to={url}>{title}</Link>
          </h3>

          <div className="misc">
            <Link className="user" to={`/profile/${user.nick}`}>{user.nick}</Link>
            {" - "}
            <time>{fromNow(created_at)}</time>
          </div>
        </div>
      );
    });

    return (
      <div className="briefings">
        <header>
          <h2>最新快讯</h2>
          <Link className="more" to="/briefings">更多</Link>
        </header>

        <List>{briefingsItems}</List>
      </div>
    );
  }
};
