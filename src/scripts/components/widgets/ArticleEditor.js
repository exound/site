import R from "ramda";
import React from "react";
import {Link} from "react-router";
import {Mount} from "lmount";
import {
  TextField, Paper, RaisedButton, List,
  ListItem, LinearProgress, FlatButton
} from "material-ui";
import Switch from "./Switch";
import MenuItem from "material-ui/lib/menus/menu-item";

import jsonFeq from "../../core/jsonFeq";
import apiPath from "../../core/apiPath";
import CoverUploader from "./CoverUploader";
import RichEditor from "./RichEditor";
import Select from "./Select";
import RemoveButton from "./RemoveButton";
import hasHistory from "../../decorators/hasHistory";

@hasHistory
export default class ArticleEditor extends React.Component {
  componentWillMount() {
    this.state = {progressDisplay: "none"};
  }

  get editedArticle() {
    const {
      coverSwitch,
      titleInput,
      contentEditor,
      statusSwitch,
      categorySelect,
      pushSelect
    } = this.refs;

    return {
      header_show: coverSwitch.value,
      title: titleInput.getValue(),
      content: contentEditor.value,
      status: statusSwitch.value,
      category: categorySelect.value,
      push: pushSelect.value
    };
  }

  get article() {
    return this.props.mount.value;
  }

  save = () => {
    const data = JSON.stringify(this.editedArticle);

    this.setState({progressDisplay: "block"});

    jsonFeq.put(apiPath(`articles/${this.article.id}`), data)
      .then(({body}) => {
        this.props.mount.value = body;
        this.setState({progressDisplay: "none"});
      });
  };

  removed = () => {
    this.history.pushState(null, "/manage/articles");
  };

  render() {
    const {
      categories,
      pushes,
      mount
    } = this.props;

    const {
      id,
      title,
      content,
      push,
      category,
      header_image,
      header_show,
      status
    } = mount.value;

    const statusSwitch = (
      <Switch current={status}
              values={["published", "draft"]}
              ref="statusSwitch" />
    );

    const coverSwitch = (
      <Switch current={header_show} ref="coverSwitch" />
    );

    const categorySelect = (
      <Select ref="categorySelect" current={category} data={categories} />
    );

    const pushSelect = (
      <Select ref="pushSelect" current={push} data={pushes} />
    );

    const coverMount = Mount.on({
      path: ["article", "header_image"], data: this.props.mount.store
    });

    return (
      <Paper className="editor" style={{width: "100%", height: 1200}}>
        <section className="left">
          <CoverUploader articleId={id}
                         cover={header_image}
                         mount={coverMount} />

          <TextField defaultValue={title}
                     className="title"
                     ref="titleInput"
                     style={{width: 800, marginTop: 0}}
                     floatingLabelText="标题" />

          <RichEditor ref="contentEditor" content={content} />
        </section>

        <section className="right">
          <List style={{padding: 16}} subheader="设置">
            <ListItem primaryText="显示封面"
                      rightToggle={coverSwitch} />

            <ListItem primaryText="发布"
                      rightToggle={statusSwitch} />

            <ListItem primaryText="分类"
                      rightIconButton={categorySelect} />

            <ListItem primaryText="推送"
                      rightIconButton={pushSelect} />
          </List>

          <LinearProgress style={{display: this.state.progressDisplay}}
                          className="progress"
                          mode="indeterminate" />

          <div className="actions">
            <FlatButton onClick={this.save} label="保 存" secondary={true} />

            <Link to="/manage/articles">
              <FlatButton label="返 回" secondary={true} />
            </Link>

            <RemoveButton afterRemove={this.removed}
                          url={apiPath(`articles/${this.article.id}`)}
                          confirmText="确定删除这篇文章?" />
          </div>
        </section>
      </Paper>
    );
  }
};
