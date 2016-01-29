import R from "ramda";
import React from "react";
import classNames from "classnames";

import articlesMount from "../../core/articlesMount";
import LoadMore from "./LoadMore";

export default class ArticlesList extends React.Component {
  render() {
    const {
      Component,
      articles,
      loadMoreConfig,
      extra
    } = R.merge({
      loadMoreConfig: {}
    }, this.props);

    const {
      url,
      limit,
      offset,
      text
    } = loadMoreConfig;

    const articleItems = articles.map(article => {
      return <Component key={article.id} article={article} />;
    });

    return (
      <div className={classNames("articles", this.props.className)}>
        {articleItems}

        {extra}

        <LoadMore url={url}
                  mount={articlesMount}
                  limit={limit || 16}
                  offset={offset || 20}
                  text={text || "更多文章"} />
      </div>
    );
  }
}
