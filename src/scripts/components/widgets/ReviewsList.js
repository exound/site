import React from "react";
import List from "./List";
import ReviewItem from "./ReviewItem";

export default class ReviewsList extends React.Component {
  render() {
    const reviews = this.props.reviews;

    const items = reviews && reviews.map(review => {
      return (<ReviewItem key={review.id} review={review} />);
    });

    return (<List>{items}</List>);
  }
}
