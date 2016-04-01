import R from "ramda";
import React from "react";

import Button from "./Button";
import StaffEdit from "./StaffEdit";
import apiPath from "../../core/apiPath";

export default class StaffsList extends React.Component {
  render() {
    const {
      staffs
    } = this.props;

    const staffEditItems = R.map((staff) => {
      const id = staff.id;
      return <StaffEdit action={apiPath(`staffs/${id}`)}
                        key={id}
                        method="put"
                        staff={staff} />;
    }, staffs);

    return (
      <div className="control-group staffs-list">
        <h1>成员管理</h1>

        <div className="field">
          {staffEditItems}
          <StaffEdit action={apiPath("staffs")}
                     method="post"
                     isNew={true}
                     staff={{}} />
        </div>
      </div>
    );
  }
};
