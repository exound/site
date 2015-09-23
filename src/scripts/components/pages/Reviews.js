import React from "react";
import ReviewsList from "../widgets/ReviewsList";

export default class Reviews extends React.Component {
  render() {
    return (
      <main>
        <h1>Reviews</h1>
        <ReviewsList />
      </main>
    );
  }
};
