import R from "ramda";
import flyd from "flyd";
import React from "react";
import Router from "react-router";
import {render} from "react-dom";

import routes from "./core/routes";
import history from "./core/history";
import resolveData from "./core/resolveData";
import populateData from "./core/populateData";

class Bootstrap {
  static init(history) {
    return new Bootstrap(history);
  }

  constructor(history) {
    this.history = history;
    this.location$ = flyd.stream();
    history.listen(this.location$);

    this.data$ = flyd.map(location => resolveData(location), this.location$);

    flyd.on(this.render.bind(this), this.data$);
  }

  render(data) {
    render(
      <Router createElement={populateData(data)} history={this.history}>
        {routes}
      </Router>,
      document.querySelector("#app")
    );
  }
}

Bootstrap.init(history);
