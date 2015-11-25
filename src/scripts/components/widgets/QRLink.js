import React from "react";
import QRCode from "qrcode.react";

export default class QRLink extends React.Component {
  render() {
    const {
      className,
      text,
      color,
      url
    } = this.props;

    const style = {color};

    const textDisplay = text &&
          <span className="desc">{text}</span>;
          
    return (
      <div style={style} className={`${className} qrlink`}>
        {textDisplay}
        <QRCode fgColor={color} value={url} />
      </div>
    );
  }
};
