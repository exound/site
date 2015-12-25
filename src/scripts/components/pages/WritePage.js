import React from "react";

import apiPath from "../../core/apiPath";
import store from "../../core/store";
import PageForm from "../widgets/PageForm";

export default class WritePage extends React.Component {
  render() {
    const {
      user,
      page
    } = this.props.appState.data;

    const {
      id
    } = page;

    const action = !id ?
          apiPath("pages") :
          apiPath(`pages/${id}`);

    const method = !id ? "post" : "put";

    return (
      <main className="manage">
        <PageForm action={action}
                  user={user}
                  method={method} />
      </main>
    );
  }
};
