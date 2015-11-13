import React from "react";
import {plaintext} from "../../core/sanitize";
import {slashFormat} from "../../core/date";

export default class Promotion extends React.Component {
  render() {
    const {
      url,
      created_at,
      title
    } = this.props.promotion;

    const className = `promotion item ${this.props.className}`;

    return (
      <article className={className}>
        <section className="content">
          <h1 className="title">{title}</h1>
        </section>
      </article>
    );
  }
};
