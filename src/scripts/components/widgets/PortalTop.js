import React from "react";

import {authToken} from "../../core/globals";
import buildUser from "../../core/user";
import MenuItem from "./MenuItem";
import Menu from "./Menu";
import List from "./List";
import {Link} from "react-router";

export default class PortalTop extends React.Component {
  get user() {
    return buildUser(this.props.user);
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
      {link: `/profile/${nick}`, content: nick, icon: "user"},
      {link: "/manage", content: "管 理", icon: "cog"},
      {link: "/sign_out", content: "登 出", icon: "sign-out"}
    ]).map(({link, content, icon}) => {
      return (
        <MenuItem key={content} link={link}>
          <div>{content}</div>
          <i className={`fa fa-${icon}`} />
        </MenuItem>
      );
    });
  }

  get avatar() {
    return <img className="avatar" src={this.user.avatar} />;
  }

  render() {
    const askBase = "http://ask.exound.com"
        , askLink = (!this.user.guest) ?
          `${askBase}?token=${authToken}` : askBase;

    return (
      <header className="top full-bg">
        <Menu wrapper="nav" className="left main">
          <Menu className="sub item full-bg" content="文 章">
            {this.categoriesMenuItems}
          </Menu>

          <MenuItem link="/reviews">评 测</MenuItem>
          <MenuItem link={askLink}>社 区</MenuItem>
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
