import React from "react";

import Button from "./Button";
import HiddenFileField from "./HiddenFileField";
import HiddenField from "./HiddenField";
import uploadFile from "../../core/uploadFile";
import apiPath from "../../core/apiPath";
import bindForm from "../../decorators/bindForm";
import Imager from "./Imager";

@bindForm({
  name: "cover",
  dataPath: ["article", "cover"],
  responsePath: ["src"]
})
export default class CoverUploader extends React.Component {
  showCoverInput = (event) => {
    this.refs.coverInput.select();
  };

  render() {
    const {
      cover,
      coverable
    } = this.props;

    window.form = this.form;

    return (
      <Imager max={835} url={cover}>
        <div className="cover-uploader">
          <Button onClick={this.showCoverInput}
                  text="封面图片" />

          <span className="tip">图片体积不要超过300K</span>

          <HiddenField form={this.form}
                       name="coverable"
                       value={coverable} />

          <HiddenField form={this.form}
                       name="kind"
                       value="cover" />

          <HiddenFileField form={this.form}
                           name="file"
                           onChange={this.form.submit}
                           ref="coverInput" />
        </div>
      </Imager>
    );
  };
};
