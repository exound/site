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
  constructor(props) {
    super(props);
    this.state = {};
  }

  signIn = () => {
    this.setState({requesting: true});

    this.form.submit().then(({body, status}) => {
      if (status < 400) {
        localStorage.setItem("authToken", body.auth_token);

        const previousPath = this.location.state &&
              this.location.state.previousPath
            , path =  previousPath ?
              previousPath :
              "/";
        
        this.goTo(path);
      } else {
        this.setState({requesting: false});
      }
    }).catch(() => this.setState({requesting: false}));
  };

  render() {
    const {
      requesting
    } = this.state;

    const text = requesting ? "登录中..." : "登 录";

    return (
      <div className="form">
        <h1>登 录</h1>
        <Input placeholder="邮箱地址" type="email" form={this.form} name="email" />
        <Input placeholder="用户密码" type="password" form={this.form} name="password" />
        <Button disabled={requesting} onClick={this.signIn} text={text} />
        <Button link="/" text="返 回" />
      </div>
    );
  }
};
