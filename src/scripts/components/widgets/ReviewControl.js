import R from "ramda";
import React from "react";

import Input from "./Input";
import HiddenField from "./HiddenField";
import MapsField from "./MapsField";
import SellerMap from "./SellerMap";
import ScoreMap from "./ScoreMap";
import bindField from "../../decorators/bindField";

@bindField({
  valueGetter() {
    return this.value;
  }
})
export default class ReviewControl extends React.Component {
  get value() {
    return R.map(
      ref => ref.value,
      this.refs
    );
  }

  render() {
    const {
      id,
      price,
      currency,
      url,
      sellers,
      scores
    } = this.props.meta || {};

    const idField = id &&
          <HiddenField ref="id" value={id} />;

    return (
      <div className="review control">
        <h2>评测信息</h2>

        {idField}
        <Input ref="price"
               type="number"
               defaultValue={price}
               placeholder="价格" />

        <Input ref="currency"
               defaultValue={currency}
               placeholder="货币单位" />

        <Input ref="url"
               defaultValue={url}
               placeholder="网店地址" />

        <MapsField ref="sellers"
                   title="卖家"
                   maps={sellers}
                   Component={SellerMap}/>

        <MapsField ref="scores"
                   title="评分"
                   maps={scores}
                   Component={ScoreMap}/>
      </div>
    );
  }
};
