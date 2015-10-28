import R from "ramda";
import React from "react";
import {Toggle} from "material-ui";

export default class Switch extends React.Component {
  componentWillMount() {
    this.state = {
      toggled: this.props.current === this.values[0]
    };
  }

  toggle = (_, toggled) => {
    this.setState({toggled});
  };

  get values() {
    return this.props.values || [true, false];
  }

  get value() {
    return R.find(
      pair => pair[1] === this.state.toggled,
      R.zip(this.values, [true, false])
    )[0];
  }

  render() {
    const style = {
      display: "block",
      position: "absolute",
      right: 8,
      top: 13,
      width: 54
    };

    return (
      <Toggle style={style}
              onToggle={this.toggle}
              defaultToggled={this.state.toggled} />
    );
  }
};
