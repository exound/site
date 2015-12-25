import React from "react";

import ArticlesList from "../widgets/ArticlesList";
import ManageLinkItem from "../widgets/ManageLinkItem";
import ManageSidebar from "../widgets/ManageSidebar";

export default class ManageLinks extends React.Component {
  render() {
    const {
      links,
      user
    } = this.props.appState.data;

    const loadMoreConfig = {
      url: "/links",
      offset: 40,
      text: "更多页底链接"
    };

    return (
      <main className="manage">
        <section className="body">
          <ArticlesList className="left"
                        loadMoreConfig={loadMoreConfig}
                        Component={ManageLinkItem}
                        articles={links} />

          <ManageSidebar user={user}/>
        </section>
      </main>
    );
  }
};
