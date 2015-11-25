import R from "ramda";
import React from "react";

import QRLink from "./QRLink";
import RadarChart from "./RadarChart";
import SidebarBriefings from "./SidebarBriefings";
import Link from "./Link";

export default class ReviewSidebar extends React.Component {
  render() {
    const {
      briefings,
      meta
    } = this.props;

    const {
      price,
      scores,
      currency,
      taobao_url,
      weixin_url,
      sellers
    } = meta;

    const chartData = [R.map(item => item.score, scores)];

    const chart = !R.isEmpty(R.keys(chartData[0])) &&
          <RadarChart data={chartData}
                      height={370}
                      width={345} />;

    const sellerItems = R.map((seller) => {
      const info = sellers[seller]
           , style = {};

      if (info.logo && info.logo.length) style.backgroundImage = `url(${info.logo})`;

      return (
        <div key={seller} className="seller">
          <div className="logo" style={style} />
          <Link to={info.url} className="name">{seller}</Link>
        </div>
      );
    }, R.keys(sellers));

    const sellersDisplay = !R.isEmpty(R.keys(sellers)) &&
          <div className="sellers"> 
            {sellerItems}
          </div>;

    const weiboQRLink = weixin_url &&
          <QRLink text="微信扫码购买" url={weixin_url} color="#5AB845" />;

    const taobaoQRLink = taobao_url &&
          <QRLink text="淘宝扫码购买" url={taobao_url} color="#EE6A48" />;

    const qrcodeDisplay = (weixin_url || taobao_url) &&
          <div className="qrcodes">
            {taobaoQRLink}
            {weiboQRLink}
          </div>;
          
    const briefingsDisplay = (briefings && briefings.length) ?
          <SidebarBriefings briefings={briefings} /> :
          null;

    return (
      <aside className="review sidebar">
        <div className="chart">
          {chart}
          <div className="price">价格: {price}{currency}</div>
        </div>

        <div className="sales">
          <h2>直接购买入口</h2>
          {sellersDisplay}
          {qrcodeDisplay}
        </div>

        {briefingsDisplay}
      </aside>
    );
  }
};
