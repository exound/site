import R from "ramda";
import React from "react";
import QRCode from "qrcode.react";

import Advertisement from "../widgets/Advertisement";
import Imager from "../widgets/Imager";
import Link from "../widgets/Link";
import ArticleSidebar from "../widgets/ArticleSidebar";
import ReviewSidebar from "../widgets/ReviewSidebar";
import DiscussionSidebar from "../widgets/DiscussionSidebar";
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
      device_type,
      published_at,
      review_meta,
      review,
      user,
      type
    } = article;

    const coverDisplay = cover &&
          <Imager max={835} url={cover} className="cover" />;

    const currentUrl = `http://www.exound.com${this.props.location.pathname}`
        , encodedUrl = encodeURI(currentUrl)
        , shareWeiboUrl = `http://service.weibo.com/share/share.php?title=${pageTitle}&url=${encodedUrl}&source=www.exound.com`;

    let sidebar;

    if (type === "article") {
      sidebar = <ArticleSidebar briefings={briefings} advertisements={advertisements} />;
    } else if (type === "review") {
      sidebar = <ReviewSidebar briefings={briefings} meta={review_meta} />;
    } else if (type === "discussion") {
      sidebar = <DiscussionSidebar briefings={briefings} advertisements={advertisements} />;
    };

    const taxonomy = review ? device_type : category;

    const articleAdvertisement = type === "discussion" ?
          advertisements.position8 :
          advertisements.position3;

    const articleAdvertisementComponent = articleAdvertisement &&
          <Advertisement advertisement={articleAdvertisement} />;

    const copyRight = type !== "discussion" &&
          <div className="copyright-claim">
            <span>* 叉烧网版权所有，未经授权不得以任何形式使用。</span>
          </div>;

    return (
      <main className="article-page">
        <section className="body">
          <article className="article left">
            {coverDisplay}
            <header>
              <div className="category">{taxonomy}</div>

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

            {copyRight}
            {articleAdvertisementComponent}
          </article>

          {sidebar}

          <CommentBox commentableId={id}
                      commentableType="Article"
                      user={currentUser}
                      comments={comments} />
        </section>
      </main>
    );
  }
};
