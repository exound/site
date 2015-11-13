import React from "react";

import {fromNow} from "../../core/date";
import Link from "./Link";

export default class Comment extends React.Component {
  render() {
    const {
      comment
    } = this.props;

    const {
      user,
      content,
      created_at
    } = comment;

    const style = {
      backgroundImage: `url(${user.avatar})`
    };

    return (
      <div className="comment">
        <div className="avatar" style={style} />

        <div className="right">
          <Link to={`/profile/${user.nick}`} className="user">{user.nick}</Link>
          <time className="publish">{fromNow(created_at)}</time>
          <div className="content"
               dangerouslySetInnerHTML={{__html: content}} />
        </div>
      </div>
    );
  }
};
