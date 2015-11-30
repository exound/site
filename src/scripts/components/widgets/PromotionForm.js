import R from "ramda";
import React from "react";

import Input from "./Input";
import Button from "./Button";
import Remove from "./RemoveButton";
import hasHistory from "../../decorators/hasHistory";
import hasTimers from "../../decorators/hasTimers";
import bindForm from "../../decorators/bindForm";
import apiPath from "../../core/apiPath";

@hasTimers
@hasHistory
@bindForm({
  name: "promotion",
  dataPath: ["promotion"],
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
    },
    {
      name: "image",
      message: "请输入图片链接",
      checker: ({image}) => image && image.length
    }
  ]
})
export default class PromotionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get promotion() {
    return this.form.mount.value;
  }

  save = () => {
    const form = this.form;

    if (form){ 
      this.setState({saving: true});

      form.submit().then(({body}) => {
        this.setTimeout(() => {
          this.setState({saving: false});
        }, 2000);
      });
    }
  };

  remove = () => {
    this.goTo(this.goBackLink);
  };

  render() {
    const {
      user
    } = this.props;

    const {
      id,
      title,
      url,
      image
    } = this.promotion;

    const {
      saving
    } = this.state;

    const hasPrivilege = R.contains(user.role, ["admin", "moderator"])
        , isAuthor = !this.promotion.user || user.id === this.promotion.user.id;

    this.goBackLink = "/manage/promotions";

    const removeButton = id &&
          <Remove url={apiPath(`promotions/${id}`)}
                  text="删 除"
                  afterRemove={this.remove} />;

    const actions = (isAuthor || hasPrivilege) &&
          <div className="actions">
            <Button link={this.goBackLink} text="返 回" />

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
                   disabled={!isAuthor}
                   defaultValue={title}
                   placeholder="标题"
                   name="title" />

            <Input form={this.form}
                   disabled={!isAuthor}
                   defaultValue={url}
                   placeholder="链接"
                   name="url" />

            <Input form={this.form}
                   disabled={!isAuthor}
                   defaultValue={image}
                   placeholder="图片链接"
                   name="image" />
          </div>
        </section>

        <aside className="sidebar">
          {actions}
        </aside>
      </section>
    );
  }
};
