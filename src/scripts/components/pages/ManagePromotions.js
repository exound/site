import React from "react";

import ArticlesList from "../widgets/ArticlesList";
import ManagePromotionItem from "../widgets/ManagePromotionItem";
import ManageSidebar from "../widgets/ManageSidebar";

export default class ManagePromotions extends React.Component {
  render() {
    const {
      promotions,
      user
    } = this.props.appState.data;

    const loadMoreConfig = {
      url: "/promotions",
      offset: 40,
      text: "更多头条"
    };

    return (
      <main className="manage">
        <section className="body">
          <ArticlesList className="left"
                        loadMoreConfig={loadMoreConfig}
                        Component={ManagePromotionItem}
                        articles={promotions} />

          <ManageSidebar user={user}/>
        </section>
      </main>
    );
  }
};
