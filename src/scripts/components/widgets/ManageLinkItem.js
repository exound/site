import React from "react";

import Link from "./Link";
import {slashFormat} from "../../core/date";

export default class ManageLinkItem extends React.Component {
  render() {
    const {
      id,
      name,
      link,
      created_at
    } = this.props.article;

    return (
      <div className="article">
        <header>
          <h2>
            <Link className="fa fa-pencil-square" to={`/manage/links/${id}`}>
              {name}
            </Link>
          </h2>

          <time className="publish">{slashFormat(created_at)}</time>
        </header>
      </div>
    );
  }
};
