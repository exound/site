import React from "react";

import {fromNow} from "../../core/date";
import buildUser from "../../core/user";
import Link from "./Link";

export default class Comment extends React.Component {
  render() {
    const {
      comment
    } = this.props;

    const {
      content,
      created_at
    } = comment;

    const user = buildUser(comment.user);

    const style = {
      backgroundImage: `url(${user.avatar || "/images/guest_avatar.png"})`
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
