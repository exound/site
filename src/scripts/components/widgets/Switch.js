import React from "react";
import Toggle from "react-toggle";
import classNames from "classnames";

import bindField from "../../decorators/bindField";

@bindField({
  valueGetter() {
    const toggle = this.refs.toggle;
    return toggle && toggle.state.checked;
  },

  errorGetter() {
    return this.state.error;
  },

  errorSetter(error) {
    this.setState({error});
    return error;
  }
})
export default class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onChange,
      defaultChecked,
      label,
      className
    } = this.props;

    return (
      <label className={classNames("switch", className)}>
        <span>{label}</span>

        <Toggle defaultChecked={defaultChecked}
                ref="toggle"
                onChange={onChange} />
      </label>
    );
  }
};
