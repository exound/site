import R from "ramda";
import React from "react";
import bindForm from "../../decorators/bindForm";

export default class CategoryItem extends React.Component {
  render() {
    const {
      id,
      name,
      articles_count,
    } = R.merge({}, this.props.category);

    return (
      <div key={id} className="category">
        <div>{name}</div>

        <div className="articles-count">{articles_count}</div>

        <button className="remove">
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }
};
