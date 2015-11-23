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
export default class ManageArticleSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {review: (this.props.article || {}).review};
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

  reviewToggled = (event) => {
    this.setState({review: event.target.checked});
  };

  render() {
    const {
      user,
      form,
      article,
      categories
    } = this.props;

    const {
      id,
      published_at,
      category,
      review_meta,
    } = article || {};

    const {
      saving
    } = this.state;

    const review = this.state.review;

    const published = !!published_at;

    const options = categories.map(category => ({
      value: category,
      label: category
    }));

    const hasPrivilege = R.contains(user.role, ["admin", "moderator"])
        , isAuthor = !article.user || user.id === article.user.id;

    const toggleReview = hasPrivilege &&
          <Switch className="control"
                  defaultChecked={review}
                  form={form}
                  onChange={this.reviewToggled}
                  name="review"
                  label="开启评测" />;

    const authored = isAuthor &&
          <div className="meta-controls">
            <Switch className="control"
                    defaultChecked={published}
                    form={form}
                    name="published"
                    label="发布文章" />

            {toggleReview}
          </div>;
          
    const reviewControl = review && isAuthor &&
          <ReviewControl name="review_meta"
                         form={form}
                         meta={review_meta} />;

    this.goBackLink = isAuthor ?
      "/manage/articles/mine" :
      "/manage/articles";

    const removeButton = id &&
          <Remove url={apiPath(`articles/${id}`)}
                  text="删 除"
                  afterRemove={this.remove} />;

    const actions = (isAuthor || hasPrivilege) &&
          <div className="actions">
            <Button link={this.goBackLink}
                    text="返 回" />
            {removeButton}
            <Button className={saving && "waiting"}
                    text="保 存"
                    onClick={this.save} />
          </div>;

    return (
      <aside className="sidebar">
        {authored}
        <div className="meta-controls">
          <Select className="control"
                  options={options}
                  defaultValue={{value: category, label: category}}
                  form={form}
                  name="category"
                  placeholder="选择分类" />
        </div>
        {reviewControl}
        {actions}
      </aside>
    );
  }
};
