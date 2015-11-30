import React from "react";

import ManageSidebar from "../widgets/ManageSidebar";

export default class ManageProfile extends React.Component {
  render() {
    const {
      user
    } = this.props.appState.data;

    return (
      <main className="manage">
        <section className="body">
          <div className="left">
          </div>

          <ManageSidebar user={user}/>
        </section>
      </main>
    );
  }
};
