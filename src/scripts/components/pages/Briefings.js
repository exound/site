import React from "react";

import HomeSidebar from "../widgets/HomeSidebar";
import ArticlesList from "../widgets/ArticlesList";
import BriefingItem from "../widgets/BriefingItem";

export default class Briefings extends React.Component {
  render() {
    const {
      briefings,
      advertisements
    } = this.props.appState.data;

    const loadMoreConfig = {
      url: `/briefings?limit=20`,
      offset: 20,
      text: "更多快讯"
    };

    return (
      <main className="briefings-page">
        <section className="body">
          <ArticlesList className="left"
                        Component={BriefingItem}
                        loadMoreConfig={loadMoreConfig}
                        articles={briefings} />

          <HomeSidebar advertisements={advertisements} />
        </section>
      </main>
    );
  }
};
