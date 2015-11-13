import React, {Component, PropTypes} from "react";
import R from "ramda";
import {Mount} from "lmount";
import PortalTop from "./widgets/PortalTop";
import Bottom from "./widgets/Bottom";
import store from "../core/store";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  static childContextTypes = {
    history: PropTypes.object
  };

  shouldComponentUpdate(nextProps) {
    return !R.equals(this.props.appState, nextProps.appState);
  }

  getChildContext() {
    return {history: this.props.history};
  }

  sessionLayout(children) {
    return (
      <div className="wrapper">
        {children}
      </div>
    );
  }

  defaultLayout(children) {
    const mount = store.makeDataMount(["user"])
        , categories = this.props.appState.data.categories;

    return (
      <div className="wrapper">
        <PortalTop categories={categories} mount={mount}/>
        {children}
        <Bottom />
      </div>
    );
  }

  sessionLayout(children) {
    return (
      <div className="wrapper session">
        {children}
      </div>
    );
  }

  withLayout(name) {
    return (
      this[`${name}Layout`] || this.defaultLayout
    ).bind(this)(this.props.children);
  }

  render() {
    return this.withLayout(this.props.appState.data.layout);
  }
};
