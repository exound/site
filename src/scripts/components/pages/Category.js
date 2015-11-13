import React from "react";
import HomeSidebar from "../widgets/HomeSidebar";
import ArticlesList from "../widgets/ArticlesList";
import ArticleItem from "../widgets/ArticleItem";

export default class Category extends React.Component {
  render() {
    const {
      name,
      articles,
      advertisements
    } = this.props.appState.data;

    const loadMoreConfig = {
      url: `/articles/published?category=${name}`,
      offset: 20
    };

    return (
      <main className="category-page">
        <section className="body">
          <h1 className="category-name">{name}</h1>

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
