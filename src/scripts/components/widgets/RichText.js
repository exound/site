import R from "ramda";
import React from "react";

import bindField from "../../decorators/bindField";

@bindField({
  valueGetter() {
    return this.value;
  },

  errorGetter() {
    return this.state.error;
  },

  errorSetter(error) {
    this.setState({error});
    return error;
  }
})
export default class RichText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (!this.props.disabled) {
      this.editor = new tinymce.Editor(
        this.id,
        this.config,
        tinymce.EditorManager
      );
    }
  }

  componentDidMount() {
    if (this.editor) {
      const form = this.props.form
          , validate = form.validate.bind(form);

      R.forEach(
        (event) => this.editor.on(event, validate),
        ["nodeChange", "input", "undo", "redo"]
      );

      this.editor.render();
    }
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.off();
      this.editor.destroy();
    }
  }

  get value() {
    return this.editor ?
      this.editor.getContent() :
      this.props.content;
  }

  get config() {
    if (!this.__config__) {
      this.__config__ = {
        menubar: false,
        language_url: "http://cdn.bootcss.com/tinymce/4.2.0/langs/zh_CN.js",
        content_css: ["/tinymce.css", "/article-content.css"],
        height: 754,
        body_class: "article-content",
        statusbar: false,
        plugins: "autolink link image lists print preview media",
        toolbar: [
          "undo", "redo", "styleselect", "bold italic",
          "alignleft aligncenter alignright alignjustify",
          "blockquote bullist numlist", "link unlink image media"
        ].join(" ")
      };
    }

    return R.merge(
      this.props.config || {}, this.__config__
    );
  }

  get id() {
    if (!this.__id__) {
      const id = parseInt(
        ((Math.random() * 9 + 1)).toString().replace(".", "")
      ).toString(16);

      this.__id__ = `editor-${id}`;
    }

    return this.__id__;
  }

  render() {
    const {
      content,
      disabled,
      className,
    } = this.props;

    const {
      error
    } = this.state;

    const errorDisplay = error && <span className="msg">{error}</span>;

    return disabled ? (
      <div className="control readonly article-content"
           dangerouslySetInnerHTML={{__html: content}} />
    ) : (
      <div className={`control ${className || ""} ${error ? "error" : ""}`}>
        {errorDisplay}
        <textarea id={this.id} defaultValue={content} />
      </div>
    );
  }
};