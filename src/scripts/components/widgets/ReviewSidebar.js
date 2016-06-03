import R from "ramda";
import React from "react";

import QRLink from "./QRLink";
import RadarChart from "./RadarChart";
import SidebarBriefings from "./SidebarBriefings";
import Link from "./Link";
import Imager from "./Imager";

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
    } = R.merge(meta, {
      scores: meta.scores || [],
      sellers: meta.sellers || []
    });

    const chartData = [R.reduce((data, {key, score}) => {
      data[key] = score;
      return data;
    }, {}, scores)];

    const chart = !R.isEmpty(R.keys(chartData[0])) &&
          <RadarChart data={chartData} />;

    const sellerItems = R.map((seller) => {
      const info = sellers[seller];

      return (
        <div key={seller} className="seller">
          <Imager url={info.logo}>
            <Link to={info.url} className="badge" />
          </Imager>
        </div>
      );
    }, R.keys(sellers));

    const sellersDisplay = !R.isEmpty(R.keys(sellers)) &&
          <div className="sellers"> 
            <h2>已上架至店铺:</h2>
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

    const salesDisplay = (sellersDisplay || qrcodeDisplay) &&
          <div className="sales">
            {sellersDisplay}
            {qrcodeDisplay}
          </div>;

    return (
      <aside className="review sidebar">
        <div className="chart">
          {chart}
          <div className="price">价格: {currency}{price}</div>
        </div>

        {salesDisplay}

        {briefingsDisplay}
      </aside>
    );
  }
};
