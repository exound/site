import R from "ramda";
import React from "react";
import {RoutingContext} from "react-router";
import {renderToString} from "react-dom/server";

import createElement from "../core/createElement";

export default class ServerRenderer {
  static run({data, renderProps}) {
    return new ServerRenderer({data, renderProps}).run();
  }

  constructor({data, renderProps}) {
    this.renderProps = renderProps;
  }

  run() {
    const props = R.merge({createElement}, this.renderProps);

    return renderToString(<RoutingContext {...props} />);
  }
};
