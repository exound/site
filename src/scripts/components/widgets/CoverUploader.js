import React from "react";

import Button from "./Button";
import HiddenFileField from "./HiddenFileField";
import uploadFile from "../../core/uploadFile";
import apiPath from "../../core/apiPath";
import bindForm from "../../decorators/bindForm";

@bindForm({
  name: "cover",
  dataPath: ["article", "cover"],
  constraints: [
    {
      name: "title",
      message: "标题不能超过64个字",
      checker: ({title}) => title ? title.length <= 64 : true
    },
    {
      name: "url",
      message: "请输入链接",
      checker: ({url}) => url && url.length
    }
  ]
})
export default class CoverUploader extends React.Component {
  showCoverInput = (event) => {
    this.refs.coverInput.select();
  };

  newCover = (event) => {
    const file = this.refs.coverInput.file;

    if (file) {
      uploadFile(file, {
        article_id: this.props.articleId,
        kind: "cover"
      }).then(({body}) => {
        this.props.mount.value = body.src;
        this.refs.coverInput.clear();
      });
    }
  }

  render() {
    const {
      cover
    } = this.props;

    const style = {};

    if (cover) {
      const coverUrl = cover &&
            (cover.match(/\?/) ?
            `${cover}&max=835` :
            `${cover}?max=835`);

      style.backgroundImage = `url('${coverUrl}')`;
    }

    return (
      <div style={style} className="cover-uploader">
        <Button onClick={this.showCoverInput}
                text="封面图片" />

        <span className="tip">图片体积不要超过1mb</span>

        <HiddenFileField onChange={this.newCover} ref="coverInput" />
      </div>
    );
  };
};
