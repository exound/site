import React from "react";

import Button from "./Button";
import feq from "../../core/feq";
import apiPath from "../../core/apiPath";

export default class CoverUploader extends React.Component {
  showCoverInput = (event) => {
    this.refs.coverInput.click();
  };

  newCover = (event) => {
    const file = this.refs.coverInput.files[0];

    if (file) {
      this.upload(file);
    }
  }

  upload(file) {
    const data = new FormData();

    data.append("file", file);
    data.append("article_id", this.props.articleId);
    data.append("kind", "cover");

    feq.post(apiPath("uploads"), data).then(({body}) => {
      this.props.mount.value = body.src;
    });
  }

  render() {
    const {
      cover
    } = this.props;

    const style = {};

    if (cover) {
      const coverUrl = cover &&
            (cover.match(/\?/) ?
            `${cover}&max=1920` :
            `${cover}?max=1920`);

      style.backgroundImage = `url('${coverUrl}')`;
    }

    return (
      <div style={style} className="cover-uploader">
        <Button onClick={this.showCoverInput}
                text="封面图片" />

        <input type="file"
               onChange={this.newCover}
               ref="coverInput"
               style={{display: "none"}} />
      </div>
    );
  };
};
