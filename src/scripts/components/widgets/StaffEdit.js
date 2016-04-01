import React from "react";

import Input from "./Input";
import Button from "./Button";
import RemoveButton from "./RemoveButton";
import bindForm from "../../decorators/bindForm";
import randStr from "../../core/randStr";
import Imager from "./Imager";
import {prep} from "../../core/randStr";
import apiPath from "../../core/apiPath";

@bindForm({
  nameFactory: (props) => {
    const id = props.staff.id;

    return id ? `staff_${id}` : `staff_new`;
  },
  dataPath: ["staffs"]
})
export default class StaffEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {portrait: this.props.staff.portrait};
  }

  submit = () => {
    this.form.submit();
    const state = {timeStamp: Date.now()};
    if (this.props.isNew) state.portrait = null;
    this.setState(state);
  };

  portrait = () => {
    this.setState({portrait: this.refs.portrait.value});
  };

  remove = ({body}) => {
    this.form.mount.value = body;
  };

  render() {
    const {
      isNew,
      staff
    } = this.props;

    const {
      id,
      name,
      title,
      portrait,
      biography
    } = staff;

    const saveButton = <Button onClick={this.submit}
                               text={id ? "保 存" : "添 加"} />;

    const removeButton = id &&
          <RemoveButton className="remove"
                        afterRemove={this.remove}
                        url={apiPath(`staffs/${id}`)}/>;

    const portraitItem = this.state.portrait ?
          <Imager url={this.state.portrait} className="portrait" /> :
          <div className="portrait" />;

    return (
      <div className="staff edit" key={isNew ? this.state.timeStamp : id}>
        {portraitItem}
        <Input form={this.form}
               type="text"
               name="name"
               defaultValue={name}
               placeholder="姓名" />
        <Input form={this.form}
               type="text"
               name="title"
               defaultValue={title}
               placeholder="职位" />
        <Input form={this.form}
               type="text"
               ref="portrait"
               onChange={this.portrait}
               name="portrait"
               defaultValue={portrait}
               placeholder="照片" />
        <Input form={this.form}
               type="text"
               name="biography"
               defaultValue={biography}
               placeholder="简介" />
        {saveButton}
        {removeButton}
      </div>
    );
  }
}
