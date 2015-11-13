import R from "ramda";
import flyd from "flyd";
import React from "react";
import Router from "react-router";
import {render} from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

import title from "./core/title";
import routes from "./core/routes";
import store from "./core/store";
import history from "./core/history";
import resolveData from "./core/resolveData";
import createElement from "./core/createElement";

class Bootstrap extends React.Component {
  constructor(props = {appState: {}}) {
    super(props);

    history.listen(location => {
      resolveData(location).then(data => store.data = data);
    });
  }

  componentDidMount() {
    flyd.on(this.onStateChange, store.stream$);
  }

  onStateChange = (appState) => {
    document.title = title(appState.data && appState.data.title);
    this.setState({appState});
  };

  render() {
    return (this.state && R.keys(this.state.appState).length) ?
      <Router {...{createElement, history}}>
        {routes}
      </Router> :
      <div />;
  }
}

render(<Bootstrap />, document.querySelector("#app"));
