import React from "react";

import Link from "./Link";
import List from "./List";
import {plaintext} from "../../core/sanitize";

export default class RecentComments extends React.Component {
  render() {
    const {
      comments
    } = this.props;

    const commentsItems = comments.map(({
      id, content, user, commentable, created_at
    }) => {
      const url = `/${commentable}#comment-${id}`;

      return (
        <div className="comment" key={id}>
          <Link to={url}>{plaintext(content)}</Link>
        </div>
      );
    });

    return (
      <div className="comments">
        <header>
          <h2>最新评论</h2>
        </header>

        <List>{commentsItems}</List>
      </div>
    );
  }
};
