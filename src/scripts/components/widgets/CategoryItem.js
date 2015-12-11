import R from "ramda";
import React from "react";
import classNames from "classnames";

import apiPath from "../../core/apiPath";
import Input from "./Input";
import Remove from "./RemoveButton";
import bindForm from "../../decorators/bindForm";

@bindForm({
  name: "categories",
  dataPath: ["categories"],
  responsePath: ["categories"]
})
export default class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  edit = () => {
    if (!this.state.edit) this.setState({
      edit: true
    }, () => {
      this.refs.input.focus();
    });
  };

  cancel = () => {
    if (this.state.edit) this.setState({
      edit: false
    });
  };

  save = () => {
    this.form.submit().then(() => {
      this.setState({edit: false});
    });
  };

  remove = ({body}) => {
    this.form.mount.value = body;
  };

  render() {
    const {
      id,
      name,
      articles_count,
    } = R.merge({}, this.props.category);

    const {
      edit
    } = this.state;

    const className = classNames("category", {edit});

    const button = edit ?
          <button onClick={this.save} className="save">
            <i className="fa fa-floppy-o" />
          </button> :
          <Remove url={apiPath(`categories/${id}`)}
                  message={"确定要删除分类?"}
                  afterRemove={this.remove}
                  text={<i className="fa fa-trash" />} />;

    const itemContent = edit ?
          <Input ref="input"
                 form={this.form}
                 name="name"
                 defaultValue={name}
                 className="name" /> :
          <div onClick={this.edit}
               className="name">{name}</div>;

    return (
      <div onBlur={this.cancel} key={id} className={className}>
        {itemContent}
        <div className="articles-count">{articles_count}</div>
        {button}
      </div>
    );
  }
};
