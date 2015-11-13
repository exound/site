import React from "react";

import SignUpForm from "../widgets/SignUpForm";
import apiPath from "../../core/apiPath";

export default class SignUp extends React.Component {
  render() {
    return (
      <main className="session">
        <SignUpForm action={apiPath("/users")} method="post" />
      </main>
    );
  }
};
