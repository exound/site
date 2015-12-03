import React from "react";

import Button from "./Button";
import Input from "./Input";
import bindForm from "../../decorators/bindForm";

@bindForm({
  name: "userInfo",
  dataPath: ["user"],
  responsePath: ["user"],
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
    },
    {
      name: "nick",
      message: "昵称不能为空",
      checker: ({nick}) => nick && nick.length
    },
    {
      name: "nick",
      message: "昵称至少需要输入两个字符",
      checker: ({nick}) =>  nick.length >= 2
    }
  ]
})
export default class UserInfoForm extends React.Component {
  render() {
    const {
      nick,
      email
    } = this.form.mount.value;

    window.form = this.form;

    return (
      <div className="control-group form">
        <h1>昵称 & 邮箱地址</h1>

        <div className="field">
          <Input form={this.form}
                 defaultValue={nick}
                 placeholder="昵称"
                 name="nick" />

          <Input form={this.form}
                 type="email"
                 defaultValue={email}
                 placeholder="邮箱地址"
                 name="email" />
        </div>

        <div className="actions">
          <Button onClick={this.form.submit}
                  text="更新信息" />
        </div>
      </div>
    );
  }
};
