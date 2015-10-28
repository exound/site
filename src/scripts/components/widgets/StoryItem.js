import R from "ramda";
import React from "react";
import {Link} from "react-router";

export default class StoryItem extends React.Component {
  render() {
    const {
      id,
      category,
      header_image,
      title
    } = this.props.story;

    const cover = header_image.match(/\?/) ?
          `${header_image}&max=1920` :
          `${header_image}?max=1920`;

    const style = {backgroundImage: `url('${cover}')`};

    return (
      <div className="story item cover" style={R.merge(this.props.style, style)}>
        <h2 className="category">
          <Link to={`/categories/${category}`}>{category}</Link>
        </h2>

        <h1 className="title">
          <Link to={`/articles/${id}`}>{title}</Link>
        </h1>
      </div>
    );
  }
}
