import React from "react";

import Link from "./Link";
import {slashFormat} from "../../core/date";

export default class ManagePageItem extends React.Component {
  render() {
    const {
      id,
      name,
      title,
      page,
      created_at
    } = this.props.article;

    return (
      <div className="article">
        <header>
          <h2>
            <Link className="fa fa-pencil-square" to={`/manage/pages/${id}`}>
              {title}
            </Link>
          </h2>

          <time className="publish">{slashFormat(created_at)}</time>
        </header>

        <section className="misc">
          <Link to={`/pages/${name}`}>{`/pages/${name}`}</Link>
        </section>
      </div>
    );
  }
};
