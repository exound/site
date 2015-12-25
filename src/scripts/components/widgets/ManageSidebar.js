import R from "ramda";
import React from "react";

import Link from "./Link";

export default class ManageSidebar extends React.Component {
  render() {
    const {
      user
    } = this.props;

    const privileged = R.contains(user.role, ["admin", "editor"]) &&
          <div className="menu">
            <Link to="/manage/write/promotion">添加头条</Link>
            <Link to="/manage/write/page">添加页面</Link>
            <Link to="/manage/write/link">添加页底链接</Link>
            <Link to="/manage/articles">管理文章</Link>
            <Link to="/manage/promotions">管理头条</Link>
            <Link to="/manage/categories">管理分类</Link>
            <Link to="/manage/links">管理页底</Link>
            <Link to="/manage/pages">管理页面</Link>
        {/* <Link to="/manage/briefings">管理快讯</Link>
            <Link to="/manage/advertisements">管理广告</Link> */}
          </div>;

    const articleRelated = R.contains(user.role, [
      "author", "editor", "admin"
    ]) && [
      <Link key="write_article" to="/manage/write/article">撰写文章</Link>,
      <Link key="my_article" to="/manage/articles/mine">我的文章</Link>
    ];

    return (
      <aside className="sidebar">
        <div className="menu">
          {articleRelated}
          <Link to="/manage/write/briefing">投递快讯</Link>
          <Link to="/manage/briefings/mine">我的快讯</Link>
          <Link to="/manage/profile">个人信息</Link>
        </div>

        {privileged}
      </aside>
    );
  }
};
