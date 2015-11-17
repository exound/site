import React from "react";

import randStr from "../../core/randStr";

export default class HiddenFileField extends React.Component {
  get file() {
    return this.refs.input.files[0];
  }

  select() {
    this.refs.input.click();
  }

  clear() {
    this.setState({key: randStr()});
  }

  render() {
    const {
      onChange
    } = this.props;

    return (
      <input type="file"
             onChange={onChange}
             key={this.state ? this.state.key : randStr()}
             ref="input"
             style={{display: "none"}} />
    );
  }
};
