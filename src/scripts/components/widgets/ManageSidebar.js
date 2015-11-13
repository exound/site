import R from "ramda";
import React from "react";

import Link from "./Link";

export default class ManageSidebar extends React.Component {
  render() {
    const {
      user
    } = this.props;

    const privileged = R.contains(user.role, ["admin", "moderator"]) &&
          <div className="menu">
            <Link to="/manage/write/promotion">添加头条</Link>
            <Link to="/manage/articles">管理文章</Link>
            <Link to="/manage/promotions">管理头条</Link>
        {/* <Link to="/manage/briefings">管理快讯</Link>
            <Link to="/manage/categories">管理分类</Link>
            <Link to="/manage/advertisements">管理广告</Link> */}
          </div>;

    return (
      <aside className="sidebar">
        <div className="menu">
          <Link to="/manage/write/article">撰写文章</Link>
      {/* <Link to="/manage/write/briefing">投递快讯</Link> */}
          <Link to="/manage/articles/mine">我的文章</Link>
      {/* <Link to="/manage/briefings/mine">我的快讯</Link> */}
        </div>
        {privileged}
      </aside>
    );
  }
};
