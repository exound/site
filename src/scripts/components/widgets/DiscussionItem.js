import React from "react";

import {Link} from "react-router";
import {chinese} from "../../core/date";

export default class DiscussionItem extends React.Component {
  render() {
    const {
      id,
      title,
      content,
      published_at,
      user
    } = this.props.article;

    const {nick} = user;

    const discussionClassName = "discussion item";

    return (
      <article className={discussionClassName}>
        <section className="content">
          <h1 className="title">
            <Link to={`/articles/${id}`}>{title}</Link>
          </h1>
        </section>

        <section className="misc">
          <span className="category fa fa-comment-o">
            <Link to="/community">COMMUNITY 社区</Link>
          </span>
          <time>{chinese(published_at)}</time>
          <span className="nick">{nick}</span>
        </section>
      </article>
    );
  }
}
