import React from "react";

import ManageSidebar from "../widgets/ManageSidebar";
import StaffsList from "../widgets/StaffsList";

export default class ManageStaffs extends React.Component {
  render() {
    const {
      user,
      staffs
    } = this.props.appState.data;

    return (
      <main className="manage">
        <section className="body">
          <div className="left">
            <StaffsList staffs={staffs} />
          </div>

          <ManageSidebar user={user}/>
        </section>
      </main>
    );
  }
}
