import React from "react";

import bindForm from "../../decorators/bindForm";

@hasHistory
@bindForm({
  name: "briefing",
  dataPath: ["briefing"],
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
      name: "url",
      message: "请输入链接",
      checker: ({url}) => url && url.length
    }
  ]
})
export default class BriefingForm extends React.Component {
  render() {
  }
};
