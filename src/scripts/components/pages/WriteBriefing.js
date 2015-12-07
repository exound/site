import React from "react";

import apiPath from "../../core/apiPath";
import store from "../../core/store";
import BriefingForm from "../widgets/BriefingForm";

export default class WriteBriefing extends React.Component {
  render() {
    const {
      user,
      briefing
    } = this.props.appState.data;

    const {
      id
    } = briefing;

    const action = !id ?
          apiPath("briefings") :
          apiPath(`briefings/${id}`);

    const method = !id ? "post" : "put";

    return (
      <main className="manage">
        <BriefingForm action={action}
                      user={user}
                      method={method} />
      </main>
    );
  }
};
