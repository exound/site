import React from "react";

import articlesMount from "../../core/articlesMount";
import LoadMore from "./LoadMore";

export default class ArticlesList extends React.Component {
  render() {
    const {
      Component,
      articles,
      loadMoreConfig
    } = this.props;

    const {
      url,
      limit,
      offset,
      text
    } = loadMoreConfig || {};

    const articleItems = articles.map(article => {
      return <Component key={article.id} article={article} />;
    });

    return (
      <div className={`articles ${this.props.className || ""}`}>
        {articleItems}

        <LoadMore url={url}
                  mount={articlesMount}
                  limit={limit || 16}
                  offset={offset || 20}
                  text={text || "更多文章"} />
      </div>
    );
  }
}
