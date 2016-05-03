import React from "react";

import {fromNow} from "../../core/date";
import buildUser from "../../core/user";
import Link from "./Link";
import Imager from "./Imager";

export default class Comment extends React.Component {
  render() {
    const {
      comment
    } = this.props;

    const {
      id,
      content,
      created_at
    } = comment;

    const user = buildUser(comment.user);

    return (
      <div className="comment" id={`comment-${id}`}>
        <Imager className="avatar" url={user.avatar} />

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
