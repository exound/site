import React from "react";

import Imager from "./Imager";
import {Link} from "react-router";
import {plaintext} from "../../core/sanitize";
import {slashFormat} from "../../core/date";

export default class ArticleItem extends React.Component {
  render() {
    const {
      id,
      title,
      cover,
      category,
      content,
      published_at,
      user
    } = this.props.article;

    const articleClassName = cover ?
          "article item" :
          "article item nocover";

    const coverDisplay = cover &&
          <Imager max={500} url={cover} className="cover" />;

    return (
      <article className={articleClassName}>
        <section className="content">
          <h1 className="title">
            <Link to={`/articles/${id}`}>{title}</Link>
          </h1>

          <section className="publish">
            <Link className="user" to={`/profile/${user.nick}`}>
              {user.nick}
            </Link>

            {" - "}

            <time>{slashFormat(published_at)}</time>
          </section>

          <section className="excerpt">
            {plaintext(content)}
          </section>
        </section>

        <section className="misc">
          <span className="category fa fa-gg-circle">
            <Link to={`/categories/${category}`}>{category}</Link>
          </span>
        </section>

        {coverDisplay}
      </article>
    );
  }
}
