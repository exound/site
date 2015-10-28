import React from "react";
import {AppBar, IconMenu, IconButton, Icons, LeftNav} from "material-ui";
import MenuItem from "material-ui/lib/menus/menu-item";
import MoreVertIcon from "material-ui/lib/svg-icons/navigation/more-vert";
import hasHistory from "../../decorators/hasHistory";

@hasHistory
export default class ManageTop extends React.Component {
  get items() {
    return [
      {url: "/", text: "首页"},
      {url: "/manage/articles/mine", text: "我的文章"},
      {url: "/manage/articles", text: "推送文章"},
      {url: "/manage/reviews", text: "评测管理"}
    ];
  }

  get manageNav() {
    return (
      <LeftNav ref="manageNav"
               onChange={this.onNavChange}
               docked={false}
               menuItems={this.items} />
    );
  }

  showManageNav = (event) => {
    this.refs.manageNav.toggle();
  };

  onNavChange = (_1, _2, item) => {
    this.history.pushState(null, item.url);
  };

  render() {
    const style = {
      backgroundColor: "#2E363B"
    };

    const left = (
          <IconButton onClick={this.showManageNav}>
            <Icons.NavigationMenu />
          </IconButton>
        )
        , iconButton = <IconButton><MoreVertIcon /></IconButton>
        , right = (
          <IconMenu iconButtonElement={iconButton}>
            <MenuItem>Shit</MenuItem>
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>
        );

    return (
      <AppBar style={style}
              title={this.props.appState.data.title}
              iconElementLeft={left}
              iconElementRight={right}>
        {this.manageNav}
      </AppBar>
    );
  }
}
