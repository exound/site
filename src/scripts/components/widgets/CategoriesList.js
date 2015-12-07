import React from "react";

import Button from "./Button";
import Input from "./Input";
import bindForm from "../../decorators/bindForm";

export default class CategoriesList extends React.Component {
  render() {
    const {
      categories
    } = this.props;

    const categoryItems = categories.map(({id, name}) => {
      return (
        <div key={id} className="category">
          <div>{name}</div>

          <div className="articles-count">0</div>

          <button className="remove">
            <i className="fa fa-trash" />
          </button>
        </div>
      );
    });

    return (
      <div className="control-group categories-list">
        <h1>分类管理</h1>

        <div className="field">
          {categoryItems}
        </div>

        <div className="actions">
          <Button text="添加分类" />
        </div>
      </div>
    );
  }
};
