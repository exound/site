import R from "ramda";
import React from "react";
import Promotions from "../widgets/Promotions";
import ArticlesList from "../widgets/ArticlesList";
import HomeSidebar from "../widgets/HomeSidebar";
import ArticleItem from "../widgets/ArticleItem";
import DiscussionItem from "../widgets/DiscussionItem";
import NPArticleItem from "../widgets/NPArticleItem";
import Advertisement from "../widgets/Advertisement";

export default class Home extends React.Component {
  articleComponentFactory = (obj) => {
    if (obj.type === "discussion") return DiscussionItem;
    if (obj.user.role === "author") return NPArticleItem;
    return ArticleItem;
  };

  render() {
    const {
      promotions,
      articles,
      advertisements,
      briefings,
      comments
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
                        ComponentFactory={this.articleComponentFactory}
                        extra={advertisement}
                        loadMoreConfig={loadMoreConfig}
                        articles={articles} />

          <HomeSidebar briefings={briefings}
                       advertisements={R.omit(["position6"], advertisements)}
                       comments={comments} />
        </section>
      </main>
    );
  }
};
