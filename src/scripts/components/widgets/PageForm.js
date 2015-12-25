import R from "ramda";
import React from "react";
import {Link} from "react-router";

import RichText from "./RichText";
import Input from "./Input";
import apiPath from "../../core/apiPath";
import jsonFeq from "../../core/jsonFeq";
import CoverUploader from "./CoverUploader";
import ManagePageSidebar from "./ManagePageSidebar";
import hasHistory from "../../decorators/hasHistory";
import bindForm from "../../decorators/bindForm";

@hasHistory
@bindForm({
  name: "page",
  dataPath: ["page"],
  constraints: [
    {
      name: "title",
      message: "请输入标题",
      checker: ({title}) => title && title.length
    },
    {
      name: "title",
      message: "标题不能超过64个字",
      checker: ({title}) => title && title.length <= 64
    },
    {
      name: "content",
      message: "请输入内容",
      checker: ({content}) => content && content.length
    }
  ]
})
export default class PageForm extends React.Component {
  componentWillMount() {
    this.state = {progressDisplay: "none"};
  }

  get page() {
    return this.form.mount.value;
  }

  removed = () => {
    this.goTo("/manage/pages");
  };

  render() {
    const {
      categories,
      deviceTypes,
      user
    } = this.props;

    const {
      id,
      title,
      name,
      content,
      cover,
    } = this.page;

    const coverable = {type: "Page", id};

    const coverUploader = id &&
          <CoverUploader coverable={coverable}
                         action={apiPath("uploads")}
                         method="post"
                         cover={cover} />;

    return (
      <section className="body">
        <section className="left">
          {coverUploader}
          <div className="form"> 
            <Input form={this.form}
                   defaultValue={title}
                   placeholder="标题"
                   name="title" />

            <Input form={this.form}
                   defaultValue={name}
                   placeholder="名称"
                   name="name" />

            <RichText content={content}
                      form={this.form}
                      name="content" />
          </div>
        </section>

        <ManagePageSidebar form={this.form}
                           page={this.page}
                           user={user} />
      </section>
    );
  }
};
