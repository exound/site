import R from "ramda";
import React from "react";

import Input from "./Input";

export default class ScoreMap extends React.Component {
  get value() {
    return R.merge(
      {key: this.props.name},
      R.map(ref => ref.value, this.refs)
    );
  }

  render() {
    const {
      name,
      info,
      removeMap
    } = this.props;

    return (
      <div className="score map">
        <header>
          <div className="name">{name}</div>
          <button onClick={removeMap}><i className="fa fa-times-circle" /></button>
        </header>

        <Input ref="score" type="number" defaultValue={info.score} placeholder="分数" />
      </div>
    );
  }
};
