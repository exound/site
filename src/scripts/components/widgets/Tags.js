import React from "react";
import {MultiSelect as Sel} from "react-selectize";
import classNames from "classnames";

import bindField from "../../decorators/bindField";

@bindField({
  valueGetter() {
    return [];
  },

  errorGetter() {
    return this.state.error;
  },

  errorSetter(error) {
    this.setState({error});
    return error;
  }
})
export default class Tags extends React.Component {
  create = (options, values, search) => {
    const labels = values.map(function(value){ 
      return value.label; 
    });

    if (search.trim().length === 0 || labels.indexOf(search.trim()) !== -1) return null;
    return {label: search.trim(), value: search.trim()};
  };

  render() {
    const {
      className,
      placeholder
    } = this.props;

    return (
      <label className={classNames("switch", className)}>
        <Sel placeholder={placeholder}
             delimiters={[188]}
             ref="select"
             className="select"
             createFromSearch={this.create} />
      </label>
    );
  }
};
