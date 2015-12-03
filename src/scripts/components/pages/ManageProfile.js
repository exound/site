import React from "react";

import apiPath from "../../core/apiPath";
import ManageSidebar from "../widgets/ManageSidebar";
import AvatarForm from "../widgets/AvatarForm";
import UserInfoForm from "../widgets/UserInfoForm";
import PasswordForm from "../widgets/PasswordForm";

export default class ManageProfile extends React.Component {
  render() {
    const {
      user
    } = this.props.appState.data;

    return (
      <main className="manage">
        <section className="body">
          <div className="left">
            <AvatarForm action={apiPath("uploads")} method="post" />
            <UserInfoForm action={apiPath("users/current")} method="put" />
            <PasswordForm action={apiPath("users/current")} method="put" />
          </div>

          <ManageSidebar user={user}/>
        </section>
      </main>
    );
  }
};
