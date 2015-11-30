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
  name: "briefing",
  dataPath: ["briefing"],
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
    }
  ]
})
export default class BriefingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get briefing() {
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
      url
    } = this.briefing;

    const {
      saving
    } = this.state;

    const hasPrivilege = R.contains(user.role, ["admin", "moderator"])
        , isAuthor = !this.briefing.user || user.id === this.briefing.user.id;

    this.goBackLink = isAuthor ?
      "/manage/briefings/mine" :
      "/manage/briefings";

    const removeButton = id &&
          <Remove url={apiPath(`briefings/${id}`)}
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
          </div>
        </section>

        <aside className="sidebar">
          {actions}
        </aside>
      </section>
    );
  }
};
