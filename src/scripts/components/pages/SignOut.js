import React from "react";

import hasTimers from "../../decorators/hasTimers";
import hasHistory from "../../decorators/hasHistory";

@hasTimers
@hasHistory
export default class SignOut extends React.Component {
  componentDidMount() {
    this.setTimeout(() => {
      localStorage.removeItem("authToken");
      this.goTo("/");
    }, 1600);
  }

  render() {
    return (
      <main className="session">
        <div className="form">
          <h1>正在登出</h1>
        </div>
      </main>
    );
  }
};
