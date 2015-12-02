import React from "react";

import randStr from "../../core/randStr";
import bindField from "../../decorators/bindField";

@bindField({
  isFileField: true,
  valueGetter() {
    return this.file;
  }
})
export default class HiddenFileField extends React.Component {
  get file() {
    return this.refs.input.files[0];
  }

  select() {
    this.refs.input.click();
  }

  change = () => {
    const {onChange} = this.props;

    return typeof onChange === "function" &&
      onChange(this.file);
  }

  render() {
    const {
      onChange
    } = this.props;

    return (
      <input type="file"
             onChange={this.change}
             ref="input"
             style={{display: "none"}} />
    );
  }
};
