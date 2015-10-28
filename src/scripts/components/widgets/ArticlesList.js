import React from "react";
import ArticleItem from "./ArticleItem";

export default class ArticlesList extends React.Component {
  render() {
    const articles = this.props.articles.map(article => {
      return <ArticleItem key={article.id} article={article} />;
    });

    return (
      <div className={"articles " + this.props.className}>
        {articles}
      </div>
    );
  }
}
