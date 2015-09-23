import React from "react";
import TopStories from "../widgets/TopStories";
import ArticlesList from "../widgets/ArticlesList";

export default class Home extends React.Component {
  render() {
    const {
      topStories,
      articles
    } = this.props.data;

    return (
      <main>
        <TopStories data={topStories} />
        <ArticlesList data={articles} />
      </main>
    );
  }
};
