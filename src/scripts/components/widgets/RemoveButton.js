import React from "react";

import feq from "../../core/feq";
import ConfirmButton from "./ConfirmButton";

export default class RemoveButton extends React.Component {
  onConfirm = () => {
    feq.delete(this.props.url)
      .then(this.props.afterRemove);
  };

  render() {
    const {
      label,
      confirmText
    } = this.props;

    return (
      <ConfirmButton label={label || "删 除"}
                     onConfirm={this.onConfirm}
                     confirmText={confirmText}
                     primary={true} />
    );
  }
};
