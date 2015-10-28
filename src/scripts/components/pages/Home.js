import React from "react";
import TopStories from "../widgets/TopStories";
import ArticlesList from "../widgets/ArticlesList";
import HomeSidebar from "../widgets/HomeSidebar";
import LoadMore from "../widgets/LoadMore";
import mountOn from "../../core/mountOn";

export default class Home extends React.Component {
  render() {
    const {
      topStories,
      articles,
      advertisements
    } = this.props.appState.data;

    return (
      <main className="home-page">
        <TopStories stories={topStories} />

        <section className="body">
          <ArticlesList className="left" articles={articles} />
          <HomeSidebar advertisements={advertisements} />

          <LoadMore url="/pushes/ordinary"
                    mount={mountOn(["articles"])}
                    limit={16}
                    offset={20}
                    text="更多文章" />

        </section>
      </main>
    );
  }
};
