import React from "react";
import HomeSidebar from "../widgets/HomeSidebar";
import ArticlesList from "../widgets/ArticlesList";
import ArticleItem from "../widgets/ArticleItem";

export default class Search extends React.Component {
  render() {
    const {
      q
    } = this.props.routeParams;

    const {
      articles,
      advertisements,
    } = this.props.appState.data;

    const loadMoreConfig = {
      url: `/articles/search?q=${q}`,
      offset: 20
    };

    return (
      <main className="category-page">
        <section className="body">
          <ArticlesList className="left"
                        Component={ArticleItem}
                        loadMoreConfig={loadMoreConfig}
                        articles={articles} />

          <HomeSidebar advertisements={advertisements} />
        </section>
      </main>
    );
  }
};
