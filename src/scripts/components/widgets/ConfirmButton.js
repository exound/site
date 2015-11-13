import React from "react";

import Button from "./Button";

export default class ConfirmButton extends React.Component {
  showDialog = () => {
    const onConfirm = this.props.onConfirm;

    if (confirm(this.props.message || "确定删除吗?")) {
      onConfirm && onConfirm();
    }
  }

  render() {
    const {
      text,
      className
    } = this.props;

    return (
      <Button className={className} onClick={this.showDialog} text={text} />
    );
  }
};
