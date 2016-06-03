import React from "react";
import classNames from "classnames";

import {authToken} from "../../core/globals";
import buildUser from "../../core/user";
import MenuItem from "./MenuItem";
import Menu from "./Menu";
import List from "./List";
import Button from "./Button";
import {Link} from "react-router";
import hasHistory from "../../decorators/hasHistory";
import {findDOMNode} from "react-dom";

@hasHistory
export default class PortalTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search: null};
  }

  toggleMenu = () => {
    const elm = findDOMNode(this.refs.leftMenu);
    const display = elm.style.display;
    const current = (display === "none" || !display) ? "block" : "none";

    elm.style.display = current;
  };

  get user() {
    return buildUser(this.props.user);
  }

  get categoriesMenuItems() {
    return this.props.categories.map(({name}) => {
      return (
        <MenuItem key={name} link={`/categories/${name}`}>
          {name}
        </MenuItem>
      );
    });
  }

  get deviceTypesMenuItems() {
    return this.props.deviceTypes.map(({name}) => {
      return (
        <MenuItem key={name} link={`/device_types/${name}`}>
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
      {link: "/manage/write/discussion", content: "发 帖", icon: "comments-o"},
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

  search = () => {
    const q = this.refs.searchInput.value;
    findDOMNode(this.refs.searchInput).value = "";

    this.goTo(`/search/${q}`);
  };

  render() {
    const reviewsClassNames = classNames("sub item", {
      "full-bg": !!this.props.deviceTypes.length
    });

    const reviewsLink = <Link to="/reviews">评 测</Link>;

    return (
      <header className="top full-bg">
        <Button onClick={this.toggleMenu} text={<i className="fa fa-bars" />} />
        <Menu ref="leftMenu" wrapper="nav" className="left main">
          <Menu className="sub item full-bg" content="文 章">
            {this.categoriesMenuItems}
          </Menu>

          <Menu className={reviewsClassNames} content={reviewsLink}>
            {this.deviceTypesMenuItems}
          </Menu>

          <Menu className="sub item full-bg" content="百 科">
            <MenuItem link="https://exound.taobao.com/p/buy_mic.htm">
              MICROPHONE 话筒
            </MenuItem>

            <MenuItem link="https://exound.taobao.com/p/software.htm">
              SOFTWARE 软件资源
            </MenuItem>
          </Menu>

          <MenuItem link="/community">社 区</MenuItem>
        </Menu>

        <h1 className="center">
          <Link to="/">叉烧 Beta</Link>
        </h1>

        <Menu className="right">
          <Menu className="sub item search" content={<i className="fa fa-search" />}>
            <MenuItem className="searcher">
              <div><input ref="searchInput" type="text" /></div>
              <button ref="searchButton" onClick={this.search}>搜</button>
            </MenuItem>
          </Menu>

          <Menu className="user sub item" content={this.avatar}>
            {this.userMenuItems}
          </Menu>
        </Menu>
      </header>
    );
  }
};
