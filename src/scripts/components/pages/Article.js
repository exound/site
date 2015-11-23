import R from "ramda";
import React from "react";
import QRCode from "qrcode.react";

import Link from "../widgets/Link";
import HomeSidebar from "../widgets/HomeSidebar";
import ReviewSidebar from "../widgets/ReviewSidebar";
import CommentBox from "../widgets/CommentBox";
import {slashFormat} from "../../core/date";
import titleFn from "../../core/title";

export default class Article extends React.Component {
  render() {
    const {
      article,
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
      category,
      published_at,
      review_meta,
      review,
      user,
    } = article;

    const coverUrl = cover &&
          (cover.match(/\?/) ?
          `${cover}&max=835` :
          `${cover}?max=835`);

    const coverStyle = {
      backgroundImage: `url('${coverUrl}')`
    };

    const coverDisplay = coverUrl &&
          <div className="cover" style={coverStyle} />;

    const currentUrl = `http://www.exound.com${this.props.location.pathname}`
        , encodedUrl = encodeURI(currentUrl)
        , shareWeiboUrl = `http://service.weibo.com/share/share.php?title=${pageTitle}&url=${encodedUrl}&source=www.exound.com`;

    const sidebar = (review && review_meta && !R.isEmpty(R.keys(review_meta))) ?
          <ReviewSidebar briefings={briefings} meta={review_meta} /> :
          <HomeSidebar briefings={briefings} advertisements={advertisements} />;

    return (
      <main className="article-page">
        <section className="body">
          <article className="article left">
            {coverDisplay}
            <header>
              <div className="category">{category}</div>

              <h1>{title}</h1>

              <section className="publish">
                <Link className="user" to={`/profile/${user.nick}`}>
                  {user.nick}
                </Link>

                {" - "}

                <time>{slashFormat(published_at)}</time>
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

            <div className="copyright-claim">
              <span>* 叉烧网版权所有，未经授权不得以任何形式使用。</span>
            </div>

            <CommentBox commentableId={id}
                        commentableType="Article"
                        user={currentUser}
                        comments={comments} />
          </article>

          {sidebar}
        </section>
      </main>
    );
  }
};
