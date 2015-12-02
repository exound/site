import React from "react";

import bindForm from "../../decorators/bindForm";

@bindForm({
  name: "avatar",
  dataPath: ["user", "avatar"],
  responsePath: ["src"]
})
export default class AvatarForm extends React.Component {
  render() {
    return (
      <div className="control-group avatar-uploader">
        <div className="field">
        </div>
      </div>
    );
  }
};
