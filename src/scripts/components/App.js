import React, {Component, PropTypes} from "react";
import R from "ramda";
import PortalTop from "./widgets/PortalTop";
import Bottom from "./widgets/Bottom";
import store from "../core/store";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  static childContextTypes = {
    history: PropTypes.object,
    location: PropTypes.object
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
    const {
      user,
      categories,
      deviceTypes,
      links
    } = this.props.appState.data;

    return (
      <div className="wrapper">
        <img style={{height:0, width:0, position: "absolute"}} src="/wxicon.png" />
        <PortalTop deviceTypes={deviceTypes}
                   categories={categories}
                   user={user}/>

        {children}

        <Bottom links={links} />
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
