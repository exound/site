import React from "react";

import apiPath from "../../core/apiPath";
import ArticleForm from "../widgets/ArticleForm";
import DiscussionForm from "../widgets/DiscussionForm";

export default class ManageArticle extends React.Component {
  render() {
    const {
      article,
      categories,
      deviceTypes,
      user
    } = this.props.appState.data;

    const {
      id,
      cover,
      type
    } = article;

    const FormComponent = type === "discussion" ?
          DiscussionForm :
          ArticleForm;

    return (
      <main className="manage">
        <FormComponent action={apiPath(`articles/${id}`)}
                       categories={categories}
                       deviceTypes={deviceTypes}
                       user={user}
                       method="put" />
      </main>
    );
  }
};
