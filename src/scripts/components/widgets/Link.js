import React from "react";
import {Link as L} from "react-router";

export default class Link extends React.Component {
  get isExternal() {
    return !!(this.props.to || "").match(/^(https?\:)?\/\/.*$/);
  }

  get external() {
    return ;
  }

  render() {
    const {
      to,
      className,
      children
    } = this.props;

    return this.isExternal ?
      <a target="_blank" className={className} href={to}>
        {children}
      </a> :
      <L className={className} activeClassName="active" to={to}>
        {children}
      </L>;
  }
};
