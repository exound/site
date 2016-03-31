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
    const {id, portrait} = this.props.staff;
    this.state = {portrait, id};
  }

  submit = () => {
    this.form.submit();
    const state = {timeStamp: Date.now()};
    if (!this.tate.id) state.portrait = null;
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

    return (
      <div className="staff edit" key={id || this.state.timeStamp}>
        <Imager url={this.state.portrait} className="portrait" /> 
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
