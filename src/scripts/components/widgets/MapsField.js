import R from "ramda";
import React from "react";

import Button from "./Button";

export default class MapsField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {maps: props.maps || {}};
  }

  get value() {
    return R.map(
      ref => ref.value,
      this.refs
    );
  }

  addMap = () => {
    const name = this.state.name;

    if (name && name.length && !this.state.maps[name]) {
      const mapLens = R.lensProp(name);

      this.setState({
        maps: R.set(mapLens, {}, this.state.maps),
        name: ""
      });
    }
  };

  name = (event) => {
    this.setState({name: event.target.value});
  };

  removeMap = (name) => {
    const maps = R.clone(this.state.maps);

    delete maps[name];

    this.setState({maps});
  };

  render() {
    const {
      Component,
      title
    } = this.props;

    const {
      maps
    } = this.state;

    const items = R.map((name) => {
      const info = maps[name];

      return <Component removeMap={this.removeMap}
                        ref={name}
                        key={name}
                        name={name}
                        info={info} />;
    }, R.keys(maps));

    return (
      <div className="maps control">
        <h3 className="title">{title}</h3>

        {items}

        <input value={this.state.name}
               onChange={this.name}
               placeholder={`输入${title}名称`} />

        <Button onClick={this.addMap} text="添加" />
      </div>
    );
  }
};
