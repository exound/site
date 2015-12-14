import React from "react";

import apiPath from "../../core/apiPath";
import Button from "./Button";
import Input from "./Input";
import DeviceTypeItem from "./DeviceTypeItem";
import bindForm from "../../decorators/bindForm";
import NewDeviceTypeForm from "./NewDeviceTypeForm";

export default class DeviceTypesList extends React.Component {
  render() {
    const {
      deviceTypes
    } = this.props;

    const deviceTypeItems = deviceTypes.map(deviceType => {
      const id = deviceType.id;

      return <DeviceTypeItem method="put"
                           action={apiPath(`device_types/${id}`)}
                           key={id}
                           deviceType={deviceType} />;
    });

    return (
      <div className="control-group categories-list">
        <h1>设备类型管理</h1>

        <div className="field">
          {deviceTypeItems}
        </div>

        <NewDeviceTypeForm action={apiPath(`device_types`)}
                         method="post" />
      </div>
    );
  }
};
