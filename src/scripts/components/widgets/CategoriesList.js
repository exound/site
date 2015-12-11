import React from "react";

import apiPath from "../../core/apiPath";
import Button from "./Button";
import Input from "./Input";
import CategoryItem from "./CategoryItem";
import bindForm from "../../decorators/bindForm";
import NewCategoryForm from "./NewCategoryForm";

export default class CategoriesList extends React.Component {
  render() {
    const {
      categories
    } = this.props;

    const categoryItems = categories.map(category => {
      const id = category.id;

      return <CategoryItem method="put"
                           action={apiPath(`categories/${id}`)}
                           key={id}
                           category={category} />;
    });

    return (
      <div className="control-group categories-list">
        <h1>分类管理</h1>

        <div className="field">
          {categoryItems}
        </div>

        <NewCategoryForm action={apiPath(`categories`)}
                         method="post" />
      </div>
    );
  }
};
