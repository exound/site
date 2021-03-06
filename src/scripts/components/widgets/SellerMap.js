import R from "ramda";
import React from "react";

import Input from "./Input";
import Imager from "./Imager";

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

  render() {
    const {
      name,
      info,
      removeMap
    } = this.props;

    const {
      bid,
      logo,
      url,
    } = info;

    return (
      <div className="seller map">
        <header>
          <div className="name">{name}</div>
          <button onClick={removeMap}><i className="fa fa-times-circle" /></button>
        </header>

        <Input ref="bid" type="number" defaultValue={bid} placeholder="竞价" />
        <Imager url={this.state.logo} className="badge" /> 
        <Input ref="logo" defaultValue={logo} onChange={this.logo} placeholder="logo" />
        <Input ref="url" defaultValue={url} placeholder="链接" />
      </div>
    );
  }
};
