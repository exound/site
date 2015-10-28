import React from "react";

import {bindForm} from "../../decorators/form";
import apiPath from "../../core/apiPath";
import TextField from "../widgets/TextField";

@bindForm({
  name: "signIn",
  dataPath: ["auth_token"],
  url: apiPath("tokens"),
  method: "post",
  responsePath: ["auth_token"]
})
export default class SignIn extends React.Component {
  render() {
    return (
      <main>
        <TextField form={this.form} name="email" />
        <TextField form={this.form} name="password" />
        <button onClick={this.form.submit}>登录</button>
      </main>
    );
  }
};
