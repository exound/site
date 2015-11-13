import React from "react";

import Input from "./Input";
import bindForm from "../../decorators/bindForm";

@bindForm({
  name: "signIn",
  dataPath: ["auth_token"],
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
export default class SignInForm extends React.Component {
  render() {
    return (
      <div>
        <Input placeholder="邮箱地址" form={this.form} name="email" />
        <Input placeholder="用户密码" form={this.form} name="password" />
        <button onClick={this.form.submit}>登录</button>
      </div>
    );
  }
};
