import R from "ramda";
import React from "react";

import Link from "./Link";
import UpperReviewItem from "./UpperReviewItem";

export default class UpperReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cursor: 0};
  }

  active = (cursor) => {
    this.setState({cursor});
  };

  render() {
    const {
      reviews
    } = this.props;

    const reviewItems = reviews.map((review, key) => {
      const props = {
        review,
        key,
        index: key,
        onMouseOver: this.active,
        active: this.state.cursor === key
      };

      return <UpperReviewItem {...props} />;
    });

    return (
      <div className="reviews">
        {reviewItems}
        <Link className="more" to="/reviews">更多评测</Link>
      </div>
    );
  }
};
