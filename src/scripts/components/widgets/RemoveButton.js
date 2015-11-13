import React from "react";

import feq from "../../core/feq";
import Confirm from "./ConfirmButton";

export default class RemoveButton extends React.Component {
  onConfirm = () => {
    const {
      url,
      beforeRemove,
      afterRemove
    } = this.props;

    if (beforeRemove) beforeRemove();

    if (afterRemove) feq.delete(url)
      .then(afterRemove);
  };

  render() {
    const {
      text,
      message
    } = this.props;

    return (
      <Confirm text={text || "删 除"}
               onConfirm={this.onConfirm}
               message={message} />
    );
  }
};
