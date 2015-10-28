import React from "react";
import {Link} from "react-router";

export default class MenuItem extends React.Component {
  render() {
    const {link, children} = this.props;

    const anchor = (link || "").indexOf("http") === 0 ?
          <a target="_blank" href={link}>{children}</a> :
          <Link to={link}>{children}</Link>;


    return <div className="item">{anchor}</div>;
  }
}
