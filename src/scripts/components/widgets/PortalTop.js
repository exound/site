import React from "react";
import MenuItem from "./MenuItem";
import Menu from "./Menu";
import List from "./List";
import {Link} from "react-router";

export default class PortalTop extends React.Component {
  get user() {
    return this.props.mount.value;
  }

  get categoriesMenuItems() {
    return this.props.categories.map(name => {
      return (
        <MenuItem key={name} link={`/categories/${name}`}>
          {name}
        </MenuItem>
      );
    });
  }

  get userMenuItems() {
    const {guest, nick} = this.user;

    return (guest ? [
      {link: "/sign_up", content: "注 册", icon: "user-plus"},
      {link: "/sign_in", content: "登 录", icon: "sign-in"}
    ] : [
      {link: `/profile/${nick}`, content: nick},
      {link: "/manage", content: "管 理"},
      {link: "/sign_out", content: "登 出"}
    ]).map(({link, content, icon}) => {
      return (
        <MenuItem key={content} link={link}>
          {content}
          <i className={`fa fa-${icon}`} />
        </MenuItem>
      );
    });
  }

  get avatar() {
    return <img className="avatar" src={this.user.avatar} />;
  }

  render() {
    return (
      <header className="top full-bg">
        <Menu wrapper="nav" className="left main">
          <Menu className="sub item full-bg" content="文 章">
            {this.categoriesMenuItems}
          </Menu>

          <MenuItem link="/categories/REVIEWS 评测">评 测</MenuItem>
          <MenuItem link="http://ask.exound.com">社 区</MenuItem>
        </Menu>

        <h1 className="center">
          <Link to="/">叉烧 Beta</Link>
        </h1>

        <Menu className="sub right user" content={this.avatar}>
          {this.userMenuItems}
        </Menu>
      </header>
    );
  }
};
