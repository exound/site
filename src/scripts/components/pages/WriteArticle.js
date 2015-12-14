import React from "react";

import apiPath from "../../core/apiPath";
import store from "../../core/store";
import ArticleForm from "../widgets/ArticleForm";

export default class WriteArticle extends React.Component {
  render() {
    const {
      categories,
      deviceTypes,
      user,
      article
    } = this.props.appState.data;

    const {
      id
    } = article;

    const articleMount = store.makeDataMount(["article"]);

    const action = !id ?
          apiPath("articles") :
          apiPath(`articles/${id}`);

    const method = !id ? "post" : "put";

    return (
      <main className="manage">
        <ArticleForm action={action}
                     categories={categories}
                     deviceTypes={deviceTypes}
                     user={user}
                     mount={articleMount}
                     method={method} />
      </main>
    );
  }
};
