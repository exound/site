import R from "ramda";
import React from "react";
import classNames from "classnames";

import Input from "./Input";
import Button from "./Button";
import Remove from "./RemoveButton";
import Select from "./Select";
import hasHistory from "../../decorators/hasHistory";
import hasTimers from "../../decorators/hasTimers";
import bindForm from "../../decorators/bindForm";
import apiPath from "../../core/apiPath";

@hasTimers
@hasHistory
@bindForm({
  name: "link",
  dataPath: ["link"],
  constraints: [
    {
      name: "name",
      message: "名称不能超过64个字",
      checker: ({name}) => name ? name.length <= 64 : true
    },
    {
      name: "url",
      message: "请输入链接",
      checker: ({url}) => url && url.length
    }
  ]
})
export default class LinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get link() {
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
      id,
      name,
      url,
      queue
    } = this.link;

    const {
      saving
    } = this.state;

    this.goBackLink = "/manage/links";

    const removeButton = id &&
          <Remove url={apiPath(`links/${id}`)}
                  text="删 除"
                  afterRemove={this.remove} />;

    const className = classNames("asdasd");

    const defaultOption = {
      value: queue || "queue1",
      label: queue ? `第${queue.match(/(\d+)/)[1]}列` : "第1列"
    };

    const options = R.map((value) => ({
      value: `queue${value}`, label: `第${value}列`
    }), [1, 2, 3]);

    return (
      <section className="body">
        <section className="left">
          <div className="form">
            <Input form={this.form}
                   defaultValue={name}
                   placeholder="名称"
                   name="name" />

            <Input form={this.form}
                   defaultValue={url}
                   placeholder="链接"
                   name="url" />
          </div>
        </section>

        <aside className="sidebar">
          <div className="meta-controls">
            <Select className="control"
                    options={options}
                    defaultValue={defaultOption}
                    form={this.form}
                    name={"queue"}
                    placeholder={`选择位置`} />
          </div>

          <div className="actions">
            <Button link={this.goBackLink} text="返 回" />

            {removeButton}

            <Button className={saving && "waiting"}
                    text="保 存"
                    onClick={this.save} />
          </div>
        </aside>
      </section>
    );
  }
};
