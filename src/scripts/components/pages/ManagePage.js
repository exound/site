import React from "react";

import apiPath from "../../core/apiPath";
import PageForm from "../widgets/PageForm";

export default class ManagePage extends React.Component {
  render() {
    const {
      page,
      user
    } = this.props.appState.data;

    const {
      id,
    } = page;

    return (
      <main className="manage">
        <PageForm action={apiPath(`pages/${id}`)}
                  user={user}
                  method="put" />
      </main>
    );
  }
};
