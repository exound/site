import R from "ramda";
import React from "react";
import QRCode from "qrcode.react";

import Imager from "../widgets/Imager";
import Link from "../widgets/Link";
import {slashFormat} from "../../core/date";
import titleFn from "../../core/title";

export default class Page extends React.Component {
  render() {
    const {
      page,
      advertisements,
      briefings,
      comments
    } = this.props.appState.data;

    const pageTitle = encodeURI(
      titleFn(this.props.appState.data.title)
    );

    const currentUser = this.props.appState.data.user;

    const {
      id,
      title,
      cover,
      content,
      review,
      user,
      created_at
    } = page;

    const coverDisplay = cover &&
          <Imager max={835} url={cover} className="cover" />;

    const currentUrl = `http://www.exound.com${this.props.location.pathname}`
        , encodedUrl = encodeURI(currentUrl)
        , shareWeiboUrl = `http://service.weibo.com/share/share.php?title=${pageTitle}&url=${encodedUrl}&source=www.exound.com`;

    return (
      <main className="article-page">
        <section className="body">
          <article className="article left">
            {coverDisplay}
            <header>
              <h1>{title}</h1>

              <section className="publish">
                <time>{slashFormat(created_at)}</time>
              </section>

              <section className="share">
                <Link className="weibo" to={shareWeiboUrl}>
                  <i className="fa fa-weibo"/>
                </Link>

                <div className="weixin">
                  <i className="fa fa-weixin"/>
                  <div className="qrcode">
                    <div>手机扫描分享到微信</div>
                    <QRCode value={currentUrl} />
                  </div>
                </div>
              </section>
            </header>

            <section className="article-content"
                     dangerouslySetInnerHTML={{__html: content}} />

          </article>
        </section>
      </main>
    );
  }
};
