import React from "react";

import ArticlesList from "../widgets/ArticlesList";
import ManageArticleItem from "../widgets/ManageArticleItem";
import ManageSidebar from "../widgets/ManageSidebar";

export default class ManageArticles extends React.Component {
  render() {
    const {
      articles,
      user,
      route
    } = this.props.appState.data;

    const loadMoreConfig = {
      url: "/articles/published",
      offset: 40
    };

    if (route === "/manage/articles/mine")
      loadMoreConfig.url = "/articles/mine";

    return (
      <main className="manage">
        <section className="body">
          <ArticlesList className="left"
                        loadMoreConfig={loadMoreConfig}
                        Component={ManageArticleItem}
                        articles={articles} />

          <ManageSidebar user={user}/>
        </section>
      </main>
    );
  }
};
