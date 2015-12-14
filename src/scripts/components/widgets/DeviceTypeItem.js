import R from "ramda";
import React from "react";
import classNames from "classnames";

import apiPath from "../../core/apiPath";
import Input from "./Input";
import Remove from "./RemoveButton";
import bindForm from "../../decorators/bindForm";
import {findDOMNode} from "react-dom";

@bindForm({
  name: "deviceTypes",
  dataPath: ["deviceTypes"],
  responsePath: ["device_types"]
})
export default class DeviceTypeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.body.addEventListener("click", this.cancel);
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.cancel);
  }

  edit = () => {
    if (!this.state.edit) this.setState({
      edit: true
    }, () => {
      this.refs.input.focus();
    });
  };

  cancel = ({target}) => {
    if (findDOMNode(this).contains(target)) return;

    if (this.state.edit) this.setState({
      edit: false
    });
  };

  save = () => {
    this.form.submit().then(() => {
      this.setState({edit: false});
    });
  };

  remove = ({body}) => {
    this.form.mount.value = body;
  };

  render() {
    const {
      id,
      name,
      articles_count,
    } = R.merge({}, this.props.deviceType);

    const {
      edit
    } = this.state;

    const className = classNames("category", {edit});

    const button = edit ?
          <button onClick={this.save} className="save">
            <i className="fa fa-floppy-o" />
          </button> :
          <Remove url={apiPath(`device_types/${id}`)}
                  message={"确定要删除设备类型?"}
                  afterRemove={this.remove}
                  text={<i className="fa fa-trash" />} />;

    const itemContent = edit ?
          <Input ref="input"
                 form={this.form}
                 name="name"
                 defaultValue={name}
                 className="name" /> :
          <div onClick={this.edit}
               className="name">{name}</div>;

    return (
      <div key={id} className={className}>
        {itemContent}
        <div className="articles-count">{articles_count}</div>
        {button}
      </div>
    );
  }
};
