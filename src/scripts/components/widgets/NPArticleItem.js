import React from "react";

import {Link} from "react-router";
import {chinese} from "../../core/date";

export default class NPArticleItem extends React.Component {
  render() {
    const {
      id,
      title,
      content,
      published_at,
      category,
      user
    } = this.props.article;

    const {nick} = user;

    const discussionClassName = "np item";

    return (
      <article className={discussionClassName}>
        <section className="content">
          <h1 className="title">
            <Link to={`/articles/${id}`}>{title}</Link>
          </h1>
        </section>

        <section className="misc">
          <span className="category fa fa-gg-circle">
            <Link to={`/categories/${category}`}>{category}</Link>
          </span>
          <time>{chinese(published_at)}</time>
          <span className="nick">{nick}</span>
        </section>
      </article>
    );
  }
}
