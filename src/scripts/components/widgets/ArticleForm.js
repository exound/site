import R from "ramda";
import React from "react";
import {Link} from "react-router";

import RichText from "./RichText";
import Input from "./Input";
import apiPath from "../../core/apiPath";
import jsonFeq from "../../core/jsonFeq";
import CoverUploader from "./CoverUploader";
import ManageArticleSidebar from "./ManageArticleSidebar";
import hasHistory from "../../decorators/hasHistory";
import bindForm from "../../decorators/bindForm";

@hasHistory
@bindForm({
  name: "article",
  dataPath: ["article"],
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
export default class ArticleForm extends React.Component {
  componentWillMount() {
    this.state = {progressDisplay: "none"};
  }

  get article() {
    return this.form.mount.value;
  }

  removed = () => {
    this.goTo("/manage/articles");
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
      content,
      category,
      cover,
    } = this.article;

    const canEdit = !this.article.user || user.id === this.article.user.id;

    const coverUploader = id &&
          <CoverUploader articleId={id}
                         action={apiPath("uploads")}
                         method="post"
                         cover={cover} />;

    return (
      <section className="body">
        <section className="left">
          {coverUploader}
          <div className="form"> 
            <Input form={this.form}
                   disabled={!canEdit}
                   defaultValue={title}
                   placeholder="标题"
                   name="title" />

            <RichText content={content}
                      disabled={!canEdit}
                      form={this.form}
                      name="content" />
          </div>
        </section>

        <ManageArticleSidebar form={this.form}
                              categories={categories}
                              deviceTypes={deviceTypes}
                              article={this.article}
                              user={user} />
      </section>
    );
  }
};
