import React from "react";

import hasTimers from "../../decorators/hasTimers";
import hasHistory from "../../decorators/hasHistory";

@hasTimers
@hasHistory
export default class NotFound extends React.Component {
  componentDidMount() {
    this.setTimeout(() => {
      this.goTo("/");
    }, 1600);
  }

  render() {
    return (
      <main className="session">
        <div className="form">
          <h1>404 页面不存在</h1>
        </div>
      </main>
    );
  }
};
