import React from "react";

import Button from "./Button";
import Input from "./Input";
import bindForm from "../../decorators/bindForm";

@bindForm({
  name: "newDeviceType",
  dataPath: ["deviceTypes"],
  responsePath: ["device_types"]
})
export default class NewDeviceTypeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {timeStamp: Date.now()};
  }

  submit = () => {
    this.form.submit();
    this.setState({timeStamp: Date.now()});
  };

  render() {
    return (
      <div className="actions">
        <Input name="name"
               key={this.state.timeStamp}
               form={this.form} />

        <Button onClick={this.submit} text="添加设备类型" />
      </div>
    );
  }
};
