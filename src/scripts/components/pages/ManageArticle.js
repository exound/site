import React from "react";
import {Mount} from "lmount";

import ArticleEditor from "../widgets/ArticleEditor";

export default class ManageArticle extends React.Component {
  render() {
    const {
      id,
      header_image,
    } = this.props.appState.data.article;

    const coverMount = Mount.on({
      path: ["article", "header_image"], data: this.store
    });

    const articleMount = Mount.on({
      path: ["article"], data: this.store
    });

    return (
      <main className="manage article">
        <ArticleEditor mount={articleMount}
                       pushes={this.data.pushes}
                       categories={this.data.categories}/>
      </main>
    );
  }
};
