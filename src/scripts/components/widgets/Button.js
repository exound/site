import React from "react";

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
          className: `btn ${className || ""} ${disabled ? "disabled" : ""}`
        };

    if (link) props.to = link;

    return (
      <Component {...props}><span>{text}</span></Component>
    );
  }
};
