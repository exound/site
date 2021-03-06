import R from "ramda";
import React from "react";
import classNames from "classnames";

import Link from "./Link";
import UpperReviews from "./UpperReviews";
import hasTimers from "../../decorators/hasTimers";
import Imager from "./Imager";

@hasTimers
export default class Promotions extends React.Component {
  constructor(props) {
    super(props);
    this.elapsed = 0;
    this.state = {cursor: 0};
  }

  componentDidMount() {
    this.setInterval(this.accumulate, 1000);
    this.setInterval(this.loop, 1000);
  }

  get dots() {
    return (
      <div className="dots">
        {R.take(5, this.props.promotions).map((_, key) => {
          const onClick = () => this.cursor = key
              , className = classNames({active: this.cursor === key});

          return <button {...{className, onClick, key}}></button>;
        })}
      </div>
    );
  }

  get promotions() {
    return this.props.promotions;
  }

  get cursor() {
    return this.state.cursor;
  }

  set cursor(cursor) {
    this.setState({cursor});
    this.elapsed = 0;
    return cursor;
  }

  get last() {
    return this.promotions.length - 1;
  }

  get current() {
    return this.promotions[this.cursor];
  }

  accumulate = () => {
    if (this.elapsed < 8000) {
      this.elapsed += 1000;
    } else {
      this.elapsed = 0;
    }
  };

  loop = () => {
    if (this.elapsed !== 8000) return;

    if (this.cursor !== this.last) {
      this.cursor = this.cursor + 1;
    } else {
      this.cursor = 0;
    }

    this.elapsed = 0;
  };

  render() {
    return (
      <Imager url={this.current.image}>
        <div className="top-promotions upper">
          <Link className="promotions" to={this.current.url} />
          {this.dots}
        </div>
      </Imager>
    );
  }
}
