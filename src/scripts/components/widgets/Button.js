import React from "react";
import classNames from "classnames";

import Link from "./Link";

export default class Button extends React.Component {
  render() {
    const {
      text,
      className,
      type,
      link,
      onClick,
      disabled
    } = this.props;

    const Component =  link ? Link : "button"
        , props = {
          onClick,
          disabled,
          className: classNames("btn", className, {disabled})
        };

    if (link) props.to = link;

    return (
      <Component {...props}><span>{text}</span></Component>
    );
  }
};
