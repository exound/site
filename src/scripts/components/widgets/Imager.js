import R from "ramda";
import React from "react";

export default class Imager extends React.Component {
  render() {
    const {
      url,
      className,
      children,
      max,
      style,
      elm
    } = R.merge({
      style: {},
      className: ""
    }, this.props);

    const childrenCount = React.Children.count(children);

    if (!url) return childrenCount ? children : null;

    const mark = url.match(/\?/) ? "&" : "?"
        , query = max ? `${mark}max=${max}` : "";

    if (elm === "img") return <img src={`${url}${query}`} className={`imager ${className}`} />;

    style.backgroundImage = `url('${url}${query}')`;

    if (childrenCount) return React.cloneElement(
      React.Children.only(children),
      {style}
    );

    return <div style={style} className={`imager ${className}`} />;
  }
};
