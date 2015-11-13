import React from "react";

import bindField from "../../decorators/bindField";

@bindField({
  valueGetter() {
    const text = this.refs.text;

    return text && text.value;
  },

  errorGetter() {
    return this.state.error;
  },

  errorSetter(error) {
    this.setState({error});
    return error;
  }
})
export default class SimpleText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      defaultValue,
      placeholder
    } = this.props;

    return (
      <textarea defaultValue={defaultValue}
                placeholder={placeholder}
                ref="text">
      </textarea>
    );
  }
};
