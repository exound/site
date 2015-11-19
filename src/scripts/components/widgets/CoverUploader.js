import React from "react";

import Button from "./Button";
import HiddenFileField from "./HiddenFileField";
import uploadFile from "../../core/uploadFile";
import apiPath from "../../core/apiPath";

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

        <HiddenFileField onChange={this.newCover} ref="coverInput" />
      </div>
    );
  };
};
