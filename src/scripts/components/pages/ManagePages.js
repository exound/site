import React from "react";

import ArticlesList from "../widgets/ArticlesList";
import ManagePageItem from "../widgets/ManagePageItem";
import ManageSidebar from "../widgets/ManageSidebar";

export default class ManagePages extends React.Component {
  render() {
    const {
      pages,
      user
    } = this.props.appState.data;

    const loadMoreConfig = {
      url: "/pages",
      offset: 40,
      text: "更多页底链接"
    };

    return (
      <main className="manage">
        <section className="body">
          <ArticlesList className="left"
                        loadMoreConfig={loadMoreConfig}
                        Component={ManagePageItem}
                        articles={pages} />

          <ManageSidebar user={user}/>
        </section>
      </main>
    );
  }
};
