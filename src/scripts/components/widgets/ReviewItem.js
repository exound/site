import React from "react";

export default class ReviewItem extends React.Component {
  render() {
    const review = this.props.review;

    if (review) {
      return (
        <div>
          <h1>{review.title}</h1>
        </div>
      );
    }
  }
}
