import R from "ramda";
import React from "react";
import {Link} from "react-router";

import Switch from "./Switch";
import RichText from "./RichText";
import Button from "./Button";
import Remove from "./RemoveButton";
import Input from "./Input";
import Hidden from "./HiddenField";
import Tags from "./Tags";
import apiPath from "../../core/apiPath";
import jsonFeq from "../../core/jsonFeq";
import ManageArticleSidebar from "./ManageArticleSidebar";
import hasHistory from "../../decorators/hasHistory";
import bindForm from "../../decorators/bindForm";
import hasTimers from "../../decorators/hasTimers";

@hasTimers
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
export default class DiscussionForm extends React.Component {
  componentWillMount() {
    this.state = {progressDisplay: "none"};
  }

  save = () => {
    if (this.form){ 
      this.setState({saving: true});

      this.form.submit().then(({body}) => {
        this.setTimeout(() => {
          this.setState({saving: false});
        }, 2000);
      });
    }
  };

  get article() {
    return this.form.mount.value;
  }

  removed = () => {
    this.goTo("/manage/articles/mine");
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
      published_at,
      type,
      tags
    } = this.article;

    const {
      saving
    } = this.state;

    const hasPrivilege = R.contains(user.role, ["admin", "editor"]);

    const canEdit = !this.article.user || user.id === this.article.user.id;

    const published = !!published_at;

    const authored = canEdit &&
          <div className="meta-controls">
            <Switch className="control"
                    defaultChecked={published}
                    form={this.form}
                    name="published"
                    label="发布帖子" />
          </div>;
          
    const removeButton = id &&
          <Remove url={apiPath(`articles/${id}`)}
                  text="删 除"
                  afterRemove={this.remove} />;

    const actions = (canEdit || hasPrivilege) &&
          <div className="actions">
            <Button link="/manage/articles/mine"
                    text="返 回" />
            {removeButton}
            <Button className={saving && "waiting"}
                    text="保 存"
                    onClick={this.save} />
          </div>;

    return (
      <section className="body">
        <section className="left">
          <div className="form"> 
            <Input form={this.form}
                   disabled={!canEdit}
                   defaultValue={title}
                   placeholder="标题"
                   name="title" />

            <Hidden form={this.form}
                    name="type"
                    value={type} />

            <RichText content={content}
                      disabled={!canEdit}
                      form={this.form}
                      name="content" />
          </div>
        </section>

        <aside className="sidebar">
          {authored}
          <div className="meta-controls">
          </div>
          {actions}
        </aside>
      </section>
    );
  }
};
