import React from "react";

import hasTimers from "../../decorators/hasTimers";
import hasHistory from "../../decorators/hasHistory";

@hasTimers
@hasHistory
export default class SignUpped extends React.Component {
  componentDidMount() {
    this.setTimeout(() => {
      this.goTo("/sign_in");
    }, 1600);
  }

  render() {
    return (
      <main className="session">
        <div className="form">
          <h1>注册成功, 请登录</h1>
        </div>
      </main>
    );
  }
};
