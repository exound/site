import React from "react";
import {FlatButton, Dialog} from "material-ui";

export default class ConfirmButton extends React.Component {
  dismissDialog = () => {
    this.refs.confirmDialog.dismiss();
  }

  showDialog = () => {
    this.refs.confirmDialog.show();
  }

  confirm = () => {
    this.props.onConfirm();
    this.dismissDialog();
  }

  render() {
    const actions = [
      <FlatButton label="确定"
                  key="cancel"
                  primary={true}
                  onTouchTap={this.confirm} />,

      <FlatButton label="取消"
                  key="confirm"
                  secondary={true}
                  onTouchTap={this.dismissDialog} />
    ];

    const {
      label,
      primary,
      secondary,
      modal,
      confirmText
    } = this.props;

    return (
      <div>
        <Dialog ref="confirmDialog" actions={actions} modal={modal || true}>
          {this.props.confirmText}
        </Dialog>

        <FlatButton onClick={this.showDialog} {...{label, primary, secondary}} />
      </div>
    );
  }
};
