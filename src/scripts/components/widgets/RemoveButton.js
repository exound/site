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

    feq.delete(url).then(afterRemove ? afterRemove : () => {}); 
  };

  render() {
    const {
      text,
      message,
      className
    } = this.props;

    return (
      <Confirm text={text || "删 除"}
               className={className}
               onConfirm={this.onConfirm}
               message={message} />
    );
  }
};
