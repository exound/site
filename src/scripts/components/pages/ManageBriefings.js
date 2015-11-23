import React from "react";

import ArticlesList from "../widgets/ArticlesList";
import ManageBriefingItem from "../widgets/ManageBriefingItem";
import ManageSidebar from "../widgets/ManageSidebar";

export default class ManageBriefings extends React.Component {
  render() {
    const {
      briefings,
      user
    } = this.props.appState.data;

    const loadMoreConfig = {
      url: "/briefings",
      offset: 40,
      text: "更多快讯"
    };

    return (
      <main className="manage">
        <section className="body">
          <ArticlesList className="left"
                        loadMoreConfig={loadMoreConfig}
                        Component={ManageBriefingItem}
                        articles={briefings} />

          <ManageSidebar user={user}/>
        </section>
      </main>
    );
  }
};
