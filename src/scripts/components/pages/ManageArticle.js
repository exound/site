import React from "react";

import apiPath from "../../core/apiPath";
import ArticleForm from "../widgets/ArticleForm";

export default class ManageArticle extends React.Component {
  render() {
    const {
      article,
      categories,
      user
    } = this.props.appState.data;

    const {
      id,
      cover,
    } = article;

    return (
      <main className="manage">
        <ArticleForm action={apiPath(`articles/${id}`)}
                     categories={categories}
                     user={user}
                     method="put" />
      </main>
    );
  }
};
