import R from "ramda";
import React from "react";

import Link from "./Link";

export default class UpperReviewItem extends React.Component {
  hover = () => {
    this.props.onMouseOver(this.props.index);
  };

  render() {
    const {
      review,
      index,
      active
    } = this.props;

    const {
      id,
      title,
      review_meta: {
        price,
        scores
      }
    } = review;

    const values = R.values(scores)
        , total = R.reduce(
          R.add,
          0,
          R.map(value => value.score, values)
        )
        , average = parseFloat(total ? total / values.length : 0);

    const className = active ?
          "review active" :
          "review";

    return (
      <div onMouseOver={this.hover} className={className}>
        <h2><Link to={`/articles/${id}`}>{title}</Link></h2>

        <div className="meta">
          <span className="score">评分: {average}</span>
          <span className="price">价格: {price}</span>
        </div>
      </div>
    );
  }
};

