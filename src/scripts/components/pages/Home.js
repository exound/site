import React from "react";
import Promotions from "../widgets/Promotions";
import ArticlesList from "../widgets/ArticlesList";
import HomeSidebar from "../widgets/HomeSidebar";
import ArticleItem from "../widgets/ArticleItem";

export default class Home extends React.Component {
  render() {
    const {
      promotions,
      articles,
      advertisements
    } = this.props.appState.data;

    const loadMoreConfig = {
      url: "/articles/published",
      offset: 20
    };

    return (
      <main className="portal">
        <Promotions promotions={promotions} />

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
