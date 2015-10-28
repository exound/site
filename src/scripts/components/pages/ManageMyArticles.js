import React from "react";
import {Link} from "react-router";
import {RaisedButton} from "material-ui";

import ArticlesTable from "../widgets/ArticlesTable";

export default class ManageMyArticles extends React.Component {
  render() {
    return (
      <main className="manage articles">
        <div className="actions">
          <Link to="/manage/articles/write">
            <RaisedButton label="撰写文章" secondary={true} />
          </Link>
        </div>

        <ArticlesTable articles={this.props.appState.data.articles} />
      </main>
    );
  }
};
