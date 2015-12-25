import R from "ramda";
import React from "react";

import Link from "./Link";

export default class Bottom extends React.Component {
  queue(links) {
    if (links) return (
      <div className="queue">
        {R.map(({name, url}) => <Link key={name} to={url}>{name}</Link>, links)}
      </div>
    );
  }

  render() {
    const queues = R.groupBy(link => link.queue, this.props.links);
    
    return (
      <footer className="bottom full-bg">
        <div className="copyright">
          <div className="title">
            <div className="logo-zh">
              叉烧
            </div>

            <div>人人都来玩音乐</div>
          </div>

          <div>Copyright © 2015 叉烧网</div>
          <div>京ICP备14019771</div>
        </div>

        {this.queue(queues.queue1)}
        {this.queue(queues.queue2)}
        {this.queue(queues.queue3)}
      </footer>
    );
  }
}
