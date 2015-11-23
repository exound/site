import React from "react";

import apiPath from "../../core/apiPath";
import store from "../../core/store";
import BriefingForm from "../widgets/BriefingForm";

export default class ManageBriefing extends React.Component {
  render() {
    const {
      briefing,
      user
    } = this.props.appState.data;

    const {
      id
    } = briefing;

    const mount = store.makeDataMount(["briefing"]);

    return (
      <main className="manage">
        <BriefingForm action={apiPath(`briefings/${id}`)}
                       user={user}
                       mount={mount}
                       method={"put"} />
      </main>
    );
  }
};
