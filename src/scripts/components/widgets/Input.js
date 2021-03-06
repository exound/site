import React from "react";
import classNames from "classnames";

import bindField from "../../decorators/bindField";

@bindField({
  valueGetter() {
    return this.value;
  },

  errorGetter() {
    return this.state.error;
  },

  errorSetter(error) {
    this.setState({error});
    return error;
  }
})
export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  focus() {
    this.refs.input.focus();
  }

  get value() {
    const input = this.refs.input
        , result = input && input.value;

    return this.props.type === "number" ?
      parseFloat(result) :
      result;
  }

  render() {
    const {
      className,
      type,
      placeholder,
      disabled,
      onChange,
      defaultValue
    } = this.props;

    const {
      error
    } = this.state;

    const errorDisplay = error && <span className="msg">{error}</span>;

    return (
      <div className={classNames("input control", className, {error})}>
        {errorDisplay}
        <input ref="input"
               disabled={disabled}
               defaultValue={defaultValue}
               onChange={onChange}
               placeholder={placeholder || ""}
               type={type || "text"} />
      </div>
    );
  }
};
