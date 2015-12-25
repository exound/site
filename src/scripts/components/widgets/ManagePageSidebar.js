import R from "ramda";
import React from "react";

import Switch from "./Switch";
import Select from "./Select";
import Button from "./Button";
import Remove from "./RemoveButton";
import ReviewControl from "./ReviewControl";
import hasTimers from "../../decorators/hasTimers";
import hasHistory from "../../decorators/hasHistory";
import apiPath from "../../core/apiPath";
import store from "../../core/store";

@hasTimers
@hasHistory
export default class ManagePageSidebar extends React.Component {
  constructor(props) {
    super(R.merge({page: {}}, props));
    this.state = {review: this.props.page.review};
  }

  save = () => {
    const form = this.props.form;

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
      user,
      form,
      page,
    } = this.props;

    const {id} = page;
    const {saving} = this.state;
    const review = this.state.review;
    
    this.goBackLink = "/manage/pages";

    const removeButton = id &&
          <Remove url={apiPath(`pages/${id}`)}
                  text="删 除"
                  afterRemove={this.remove} />;

    const actions = (
        <div className="actions">
          <Button link={this.goBackLink}
                  text="返 回" />

          {removeButton}

          <Button className={saving && "waiting"}
                  text="保 存"
                  onClick={this.save} />
        </div>
    );

    return (
      <aside className="sidebar">
        {actions}
      </aside>
    );
  }
};
