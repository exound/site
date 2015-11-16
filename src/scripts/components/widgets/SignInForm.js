import React from "react";

import Input from "./Input";
import Button from "./Button";
import hasHistory from "../../decorators/hasHistory";
import bindForm from "../../decorators/bindForm";

@hasHistory
@bindForm({
  name: "signIn",
  dataPath: ["auth_token"],
  responsePath: ["auth_token"],
  constraints: [
    {
      name: "email",
      message: "请输入邮箱地址",
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
  signIn = () => {
    this.form.submit().then(({body, status}) => {
      if (status < 400) {
        localStorage.setItem("authToken", body.auth_token);
        this.history.pushState(null, "/");
      }
    });
  };

  render() {
    return (
      <div className="form">
        <h1>登 录</h1>
        <Input placeholder="邮箱地址" type="email" form={this.form} name="email" />
        <Input placeholder="用户密码" type="password" form={this.form} name="password" />
        <Button onClick={this.signIn} text="登 录" />
      </div>
    );
  }
};
