import React from "react";

import Link from "./Link";
import {slashFormat} from "../../core/date";

export default class ManageBriefingItem extends React.Component {
  render() {
    const {
      id,
      title,
      user,
      created_at
    } = this.props.article;

    return (
      <div className="article">
        <header>
          <h2>
            <Link className="fa fa-pencil-square" to={`/manage/briefings/${id}`}>
              {title}
            </Link>
          </h2>
          <time className="publish">{slashFormat(created_at)}</time>
        </header>

        <section className="misc">
          <Link to={`/profile/${user.nick}`}>{user.nick}</Link>
        </section>
      </div>
    );
  }
};
