import React from "react";

import SignInForm from "../widgets/SignInForm";
import apiPath from "../../core/apiPath";

export default class SignIn extends React.Component {
  render() {
    return (
      <main>
        <SignInForm action={apiPath("tokens")} method="post" />
      </main>
    );
  }
};
