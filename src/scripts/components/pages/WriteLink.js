import React from "react";

import apiPath from "../../core/apiPath";
import LinkForm from "../widgets/LinkForm";

export default class WriteLink extends React.Component {
  render() {
    const {
      link
    } = this.props.appState.data;

    const {
      id
    } = link;

    const action = !id ?
          apiPath("links") :
          apiPath(`links/${id}`);

    const method = !id ? "post" : "put";

    return (
      <main className="manage">
        <LinkForm action={action} method={method} />
      </main>
    );
  }
};
