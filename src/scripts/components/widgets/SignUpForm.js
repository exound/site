import React from "react";

import Input from "./Input";
import Button from "./Button";
import hasHistory from "../../decorators/hasHistory";
import bindForm from "../../decorators/bindForm";

@hasHistory
@bindForm({
  name: "signUp",
  dataPath: ["user"],
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
    },
    {
      name: "password",
      message: "密码至少需要输入8个字符",
      checker: ({password}) => password && password.length >= 8
    }
  ]
})
export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  signUp = () => {
    this.form.submit().then(({body, status}) => {
      this.setState({requesting: true});

      if (status < 400) {
        this.goTo("/sign_upped");
      } else {
        this.setState({requesting: false});
      }
    }).catch(() => this.setState({requesting: false}));
  };

  render() {
    const {
      requesting
    } = this.state;

    const text = requesting ? "注册中..." : "注 册";

    return (
      <div className="form">
        <h1>注 册</h1>
        <Input placeholder="邮箱地址" type="email" form={this.form} name="email" />
        <Input placeholder="昵称(不能有空格)" type="text" form={this.form} name="nick" />
        <Input placeholder="用户密码" type="password" form={this.form} name="password" />
        <Button disabled={requesting} onClick={this.signUp} text={text} />
        <Button link="/" text="返 回" />
      </div>
    );
  }
};
