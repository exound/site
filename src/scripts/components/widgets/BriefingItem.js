import React from "react";
import {Link} from "react-router";
import {plaintext} from "../../core/sanitize";
import {fromNow} from "../../core/date";

export default class ArticleItem extends React.Component {
  render() {
    const {
      id,
      title,
      url,
      created_at,
      user
    } = this.props.article;

    return (
      <div className="briefing item">
        <h1 className="title">
          <Link to={url}>{title}</Link>
        </h1>

        <div className="misc">
          <Link className="user" to={`/profile/${user.nick}`}>
            {user.nick}
          </Link>

          {" - "}

          <time>{fromNow(created_at)}</time>
        </div>
      </div>
    );
  }
}
