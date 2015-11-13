import R from "ramda";
import React from "react";
import QRCode from "qrcode.react";

import RadarChart from "./RadarChart";
import Link from "./Link";

export default class ReviewSidebar extends React.Component {
  render() {
    const {
      price,
      scores,
      currency,
      url,
      sellers
    } = this.props.meta;

    const chartData = [R.map(item => item.score, scores)];

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

    return (
      <aside className="review sidebar">
        <div className="chart">
          <RadarChart data={chartData}
                      height={370}
                      width={345} />

          <div className="price">价格: {price}{currency}</div>
        </div>

        <div className="sales">
          <h2>直接购买入口</h2>
          {sellersDisplay}
          <QRCode value={url} />
          <div className="scan-text">或扫一扫直接购买</div>
        </div>
      </aside>
    );
  }
};
