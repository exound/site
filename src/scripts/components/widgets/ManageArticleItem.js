import React from "react";
import {Link} from "react-router";

import {slashFormat} from "../../core/date";

export default class ManageArticleItem extends React.Component {
  render() {
    const {
      id,
      title,
      user,
      category,
      push,
      published_at
    } = this.props.article;

    const publish = published_at ?
          <time className="publish">{slashFormat(published_at)}</time> :
          <span className="publish">草 稿</span>;

    const categoryDisplay = category &&
          <Link className="category" to={`/categories/${category}`}>{category}</Link>;

    return (
      <div className="article">
        <header>
          <h2>
            <Link className="fa fa-pencil-square" to={`/manage/articles/${id}`}>
              {title}
            </Link>
          </h2>
          {publish}
        </header>

        <section className="misc">
          <Link to={`/profile/${user.nick}`}>{user.nick}</Link>
          {categoryDisplay}
        </section>
      </div>
    );
  }
};
