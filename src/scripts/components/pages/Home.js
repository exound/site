import R from "ramda";
import React from "react";
import Promotions from "../widgets/Promotions";
import ArticlesList from "../widgets/ArticlesList";
import HomeSidebar from "../widgets/HomeSidebar";
import ArticleItem from "../widgets/ArticleItem";
import Advertisement from "../widgets/Advertisement";

export default class Home extends React.Component {
  render() {
    const {
      promotions,
      articles,
      advertisements,
      briefings
    } = this.props.appState.data;

    const loadMoreConfig = {
      url: "/articles/published",
      offset: 20
    };

    const promotionsDisplay = !R.isEmpty(promotions) &&
          <Promotions promotions={promotions} />;

    const ad6 = advertisements.position6;

    const advertisement = ad6 &&
          <Advertisement advertisement={ad6} />;

    return (
      <main className="portal">
        {promotionsDisplay}

        <section className="body">
          <ArticlesList className="left"
                        Component={ArticleItem}
                        extra={advertisement}
                        loadMoreConfig={loadMoreConfig}
                        articles={articles} />

          <HomeSidebar briefings={briefings}
                       advertisements={R.omit(["position6"], advertisements)} />
        </section>
      </main>
    );
  }
};
