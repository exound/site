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
      active
    } = this.props;

    const {
      id,
      title,
      cover
    } = review;

    const className = active ? "review active" : "review";

    return (
      <div onMouseOver={this.hover} className={className}>
        <h2><Link to={`/articles/${id}`}>{title}</Link></h2>
      </div>
    );
  }
};

