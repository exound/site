import R from "ramda";
import React from "react";

import Button from "./Button";

export default class MapsField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {maps: props.maps || []};
  }

  get value() {
    return R.map(
      key => this.refs[key].value,
      R.map(({key}) => key, this.state.maps)
    );
  }

  addMap = () => {
    const {name, maps} = this.state,
          index = R.findIndex(R.propEq("key", name))(maps);

    if (name && name.length && index < 0) {
      const newMaps = R.concat(R.clone(maps), [{key: name}]);

      this.setState({
        maps: newMaps,
        name: ""
      });
    }
  };

  name = (event) => {
    this.setState({name: event.target.value});
  };

  removeMap = (name) => {
    const maps = R.clone(this.state.maps)
        , index = R.findIndex(R.propEq("key", name))(maps);

    this.setState({maps: R.remove(index, 1, maps)});
  };

  render() {
    const {
      Component,
      title
    } = this.props;

    const {
      maps
    } = this.state;

    const items = R.map((info) => {
      const {key} = info;

      return <Component removeMap={this.removeMap}
                        ref={key}
                        key={key}
                        name={key}
                        info={info} />;
    }, maps);

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
