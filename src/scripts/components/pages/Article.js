import React from "react";

export default class Article extends React.Component {
  render() {
    const {
      title,
      content,
      published_at,
      user
    } = this.props.article;

    return (
      <main>
        <h1>{title}</h1>
        <section>{content}</section>
      </main>
    );
  }
};
