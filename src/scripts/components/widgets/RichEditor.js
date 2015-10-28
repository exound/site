import React from "react";
import TinyMCE from "react-tinymce";

export default class RichEditor extends React.Component {
  get value() {
    return tinymce.activeEditor.getContent();
  }

  render() {
    const {
      height,
      content,
      disabled
    } = this.props;

    const tinymceConfig = {
      menubar: false,
      language_url: "http://cdn.bootcss.com/tinymce/4.2.0/langs/zh_CN.js",
      content_css: "/tinymce.css",
      height: height || 754,
      statusbar: false,
      readonly: disabled,
      plugins: 'autolink link image lists print preview media',
      toolbar: [
        "undo", "redo", "styleselect", "bold italic",
        "alignleft aligncenter alignright alignjustify",
        "blockquote bullist numlist", "link unlink image media"
      ].join(" ")
    };

    return (
      <TinyMCE content={content || ""}
               config={tinymceConfig} /> 
    );
  }
};
