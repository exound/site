import R from "ramda";
import React from "react";
import classNames from "classnames";

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
      device_type,
      review,
      content,
      published_at,
      user
    } = this.props.article;

    const canCover = R.contains(user.role, ["partner", "editor", "admin"]);

    const coverDisplay = cover &&
          canCover &&
          <Imager max={500} url={cover} className="cover" />;

    const taxonomy = review ? device_type : category;

    const taxonomyUrl = review ?
          `/device_types/${device_type}` :
          `/categories/${category}`;

    const excerpt = canCover &&
          <section className="excerpt">
            {plaintext(content)}
          </section>;

    return (
      <article className={classNames("article", "item", {nocover: !(cover && canCover), nonpartner: !canCover})}>
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

          {excerpt}
        </section>

        <section className="misc">
          <span className="category fa fa-gg-circle">
            <Link to={taxonomyUrl}>{taxonomy}</Link>
          </span>
        </section>

        {coverDisplay}
      </article>
    );
  }
}
