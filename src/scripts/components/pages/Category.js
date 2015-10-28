import React from "react";
import HomeSidebar from "../widgets/HomeSidebar";
import ArticlesList from "../widgets/ArticlesList";
import LoadMore from "../widgets/LoadMore";
import store from "../../core/store";

export default class Category extends React.Component {
  render() {
    const {
      name,
      articles,
      advertisements
    } = this.props.appState.data;

    return (
      <main className="category-page">
        <section className="body">
          <h1 className="category-name">{name}</h1>
          <ArticlesList className="left" articles={articles} />
          <HomeSidebar advertisements={advertisements} />

          <LoadMore url={`/pushes/all?category=${name}`}
                    mount={store.makeDataMount(["articles"])}
                    limit={16}
                    offset={20}
                    text="更多文章" />

        </section>
      </main>
    );
  }
};
