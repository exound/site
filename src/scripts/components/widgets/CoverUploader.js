import React from "react";
import {Paper, RaisedButton} from "material-ui";

import feq from "../../core/feq";

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
    data.append("kind", "header_image");

    feq.post(apiPath("uploads"), data).then(({body}) => {
      this.props.mount.value = body.src;
    });
  }

  render() {
    const style = {
      textAlign: "center",
      verticalAlign: "middle",
      width: "100%",
      height: 320,
      backgroundRepeat: "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "white"
    };

    const cover = this.props.cover;

    if (cover) {
      const coverUrl = cover &&
            (cover.match(/\?/) ?
            `${cover}&max=1920` :
            `${cover}?max=1920`);

      style.backgroundImage = `url('${coverUrl}')`;
    }

    return (
      <Paper zDepth={this.props.zDepth || 0}
             className="cover-uploader"
             style={style}>

        <RaisedButton style={{marginTop: 142}}
                      onClick={this.showCoverInput}
                      label="封面图片" secondary={true} />

        <input type="file"
               onChange={this.newCover}
               ref="coverInput"
               style={{display: "none"}} />
      </Paper>
    );
  };
};
