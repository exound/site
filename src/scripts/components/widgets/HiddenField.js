import React from "react";

import bindField from "../../decorators/bindField";

@bindField({
  valueGetter() {
    return this.value;
  }
})
export default class HiddenField extends React.Component {
  get value() {
    const input = this.refs.hidden
        , result = input && input.value;

    return this.props.type === "number" ?
      parseFloat(result) :
      JSON.parse(result);
  }

  render() {
    const {
      value
    } = this.props;

    return <input ref="hidden" type="hidden" defaultValue={JSON.stringify(value)} />;
  }
};
