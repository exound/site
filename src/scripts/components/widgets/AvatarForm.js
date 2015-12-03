import React from "react";

import Imager from "./Imager";
import Button from "./Button";
import HiddenFileField from "./HiddenFileField";
import HiddenField from "./HiddenField";
import bindForm from "../../decorators/bindForm";

@bindForm({
  name: "avatar",
  dataPath: ["user", "avatar"],
  responsePath: ["src"]
})
export default class AvatarForm extends React.Component {
  showAvatarInput = (event) => {
    this.refs.avatarInput.select();
  };

  render() {
    const cover = this.form.mount.value;

    return (
      <div className="control-group avatar-uploader">
        <h1>用户头像</h1>

        <div className="field">
          <Imager className="avatar" url={cover} />

          <div className="desc">
            <p>支持jpg、gif、png格式</p>
            <p>推荐尺寸为256x256.</p>
            <p>最大文件尺寸不超过2M的图片（使用高质量图片，可生成高清头像）.</p>
          </div>

          <HiddenFileField form={this.form}
                           name="file"
                           onChange={this.form.submit}
                           ref="avatarInput" />

          <HiddenField form={this.form}
                       name="kind"
                       value="avatar" />
        </div>

        <div className="actions">
          <Button onClick={this.showAvatarInput}
                  text="上传头像" />
        </div>
      </div>
    );
  }
};
