import R from "ramda";
import React from "react";

import HomeSidebar from "../widgets/HomeSidebar";
import StaffCell from "../widgets/StaffCell";

export default class Staffs extends React.Component {
  render() {
    const {
      staffs,
      briefings,
      advertisements
    } = this.props.appState.data;

    const staffCells = R.map((staff) => {
      return <StaffCell staff={staff} key={staff.id} />;
    }, staffs);

    return (
      <main className="staffs-page">
        <section className="body">
          <section className="left">
            <h1>TEAM EXOUND</h1>
            <div className="staffs grid">{staffCells}</div>
          </section>

          <HomeSidebar briefings={briefings} advertisements={advertisements} />
        </section>
      </main>
    );
  }
}
