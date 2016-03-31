import React from "react";
import classNames from "classnames";

import track from "../../core/track.js";
import store from "../../core/track.js";
import Link from "./Link";

export default class Advertisement extends React.Component {
  click = (event) => {
    event.preventDefault();

    const {url, buyer, position} = this.props.advertisement;

    track("send", {
      hitType: "event",
      eventCategory: "advertisement",
      eventAction: "click",
      eventLabel: JSON.stringify({buyer, url, position}),
      hitCallback: () => document.location = url
    });
  };

  render() {
    const {
      advertisement,
      className
    } = this.props;

    return (
      <div onClick={this.click} className={classNames("chshgg", className)}>
        <Link to={advertisement.url}>
          <img src={advertisement.image} />
        </Link>
      </div>
    );
  }
}
