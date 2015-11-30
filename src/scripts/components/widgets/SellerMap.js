import R from "ramda";
import React from "react";

import Input from "./Input";

export default class SellerMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {logo: this.props.info.logo};
  }

  get value() {
    return R.merge(
      {key: this.props.name},
      R.map(ref => ref.value, this.refs)
    );
  }

  logo = () => {
    this.setState({logo: this.refs.logo.value});
  };

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

    const {
      bid,
      logo,
      url,
    } = info;

    const style = {};

    if (this.state.logo) style.backgroundImage = `url(${this.state.logo})`;

    return (
      <div className="seller map">
        <header>
          <div className="name">{name}</div>
          <button onClick={this.remove}><i className="fa fa-times-circle" /></button>
        </header>

        <Input ref="bid" type="number" defaultValue={bid} placeholder="竞价" />
        <div className="badge" style={style} /> 
        <Input ref="logo" defaultValue={logo} onChange={this.logo} placeholder="logo" />
        <Input ref="url" defaultValue={url} placeholder="链接" />
      </div>
    );
  }
};
