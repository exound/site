import React from "react";

import apiPath from "../../core/apiPath";
import ManageSidebar from "../widgets/ManageSidebar";
import CategoriesList from "../widgets/CategoriesList";

export default class ManageCategories extends React.Component {
  render() {
    const {
      user,
      categories
    } = this.props.appState.data;

    return (
      <main className="manage">
        <section className="body">
          <div className="left">
            <CategoriesList categories={categories} />
          </div>

          <ManageSidebar user={user}/>
        </section>
      </main>
    );
  }
};
