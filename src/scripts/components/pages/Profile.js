import React from "react";
import HomeSidebar from "../widgets/HomeSidebar";
import ArticlesList from "../widgets/ArticlesList";
import ArticleItem from "../widgets/ArticleItem";

export default class Profile extends React.Component {
  render() {
    const {
      nick,
      articles,
      advertisements
    } = this.props.appState.data;

    const loadMoreConfig = {
      url: `/articles/author/${nick}`,
      offset: 20
    };

    return (
      <main className="profile-page">
        <section className="body">
          <h1 className="profile-nick">{nick}</h1>

          <ArticlesList className="left"
                Component={ArticleItem}
                loadMoreConfig={loadMoreConfig}
                articles={articles} />

          <HomeSidebar advertisements={advertisements} />
        </section>
      </main>
    );
  }
}
