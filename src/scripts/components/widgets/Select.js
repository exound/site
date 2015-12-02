import React from "react";
import {SimpleSelect as Sel} from "react-selectize";
import classNames from "classnames";

import bindField from "../../decorators/bindField";

@bindField({
  valueGetter() {
    const select = this.refs.select;
    return select && select.value() && select.value().value;
  },

  errorGetter() {
    return this.state.error;
  },

  errorSetter(error) {
    this.setState({error});
    return error;
  }
})
export default class Select extends React.Component {
  render() {
    const {
      defaultValue,
      className,
      placeholder,
      options,
    } = this.props;

    return (
      <label className={classNames("switch", className)}>
        <Sel placeholder={placeholder}
             options={options}
             ref="select"
             className="select"
             defaultValue={defaultValue} />
      </label>
    );
  }
};
