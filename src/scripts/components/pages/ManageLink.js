import React from "react";

import apiPath from "../../core/apiPath";
import store from "../../core/store";
import LinkForm from "../widgets/LinkForm";

export default class ManageLink extends React.Component {
  render() {
    const {
      link,
      user
    } = this.props.appState.data;

    const {
      id
    } = link;

    return (
      <main className="manage">
        <LinkForm action={apiPath(`links/${id}`)}
                  user={user}
                  method={"put"} />
      </main>
    );
  }
};
