import React from "react";

import bindForm from "../../decorators/bindForm";
import apiPath from "../../core/apiPath";
import TextField from "../widgets/TextField";

@bindForm({
  name: "signIn",
  dataPath: ["auth_token"],
  url: apiPath("tokens"),
  method: "post",
  responsePath: ["auth_token"],
  constraints: [
    {
      name: "email",
      message: "请输入邮箱地址22",
      checker: ({email}) => email && email.length
    },
    {
      name: "email",
      message: "邮箱格式错误",
      checker: ({email}) => email.length > 5
    }
  ]
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
