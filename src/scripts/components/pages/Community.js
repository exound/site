import React from "react";
import HomeSidebar from "../widgets/HomeSidebar";
import ArticlesList from "../widgets/ArticlesList";
import DiscussionItem from "../widgets/DiscussionItem";

export default class Community extends React.Component {
  render() {
    const {
      name,
      articles,
      advertisements
    } = this.props.appState.data;

    const loadMoreConfig = {
      url: "/articles/discussions",
      offset: 20
    };

    return (
      <main className="category-page">
        <section className="body">
          <ArticlesList className="left"
                        Component={DiscussionItem}
                        loadMoreConfig={loadMoreConfig}
                        articles={articles} />

          <HomeSidebar advertisements={advertisements} />
        </section>
      </main>
    );
  }
};
