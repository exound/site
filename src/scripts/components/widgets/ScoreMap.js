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

  remove = () => {
    const removeMap = this.props.removeMap;

    if (removeMap) {
      removeMap(this.props.name);
    }
  }

  render() {
    const {
      name,
      info
    } = this.props;

    return (
      <div className="score map">
        <header>
          <div className="name">{name}</div>
          <button onClick={this.remove}><i className="fa fa-times-circle" /></button>
        </header>

        <Input ref="score" type="number" defaultValue={info.score} placeholder="分数" />
      </div>
    );
  }
};
