import React from "react";

import Button from "./Button";
import Input from "./Input";
import bindForm from "../../decorators/bindForm";

@bindForm({
  name: "password",
  responsePath: ["user"],
  constraints: [
    {
      name: "password",
      message: "密码至少需要输入8个字符",
      checker: ({password}) => password && password.length >= 8
    },
    {
      name: "current_password",
      message: "密码至少需要输入8个字符",
      checker: ({current_password}) => current_password && current_password.length >= 8
    }
  ]
})
export default class PasswordForm extends React.Component {
  render() {
    return (
      <div className="control-group form">
        <h1>用户密码</h1>

        <div className="field">
          <Input form={this.form}
                 type="password"
                 placeholder="当前密码"
                 name="current_password" />

          <Input form={this.form}
                 type="password"
                 placeholder="新密码"
                 name="password" />
        </div>

        <div className="actions">
          <Button onClick={this.form.submit}
                  text="修改密码" />
        </div>
      </div>
    );
  }
};
