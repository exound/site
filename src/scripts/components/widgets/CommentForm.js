import React from "react";

import bindForm from "../../decorators/bindForm";
import SimpleText from "./SimpleText";
import HiddenField from "./HiddenField";
import Button from "./Button";
import {prepend as storeUpdater} from "../../core/storeUpdaters";

@bindForm({
  name: "comment",
  dataPath: ["comments"],
  storeUpdater, 
  constraints: [
    {
      name: "content",
      message: "请输入评论内容",
      checker: ({content}) => content && content.length
    }
  ]
})
export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = () => {
    this.form.submit();
    this.setState({timeStamp: Date.now()});
  };

  render() {
    const {
      user,
      commentableId,
      commentableType
    } = this.props;

    const style = {
      backgroundImage: `url(${user.avatar})`
    };

    return (
      <div className="comment form">
        <div className="avatar" style={style} />

        <div className="right">
          <HiddenField form={this.form}
                       value={commentableType}
                       name="commentable_type" />

          <HiddenField form={this.form}
                       value={commentableId}
                       name="commentable_id" />

          <SimpleText form={this.form}
                      ref="content"
                      onChange={this.change}
                      placeholder="这里可以发表言论......"
                      key={this.state.timeStamp}
                      name="content" />

          <div className="actions">
            <div className="tip">请限制在1000字以内</div>
            <Button onClick={this.submit} text="评 论" />
          </div>
        </div>
      </div>
    );
  }
};
