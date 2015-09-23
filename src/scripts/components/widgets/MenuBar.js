import React from "react";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
import List from "./List";

export default class MenuBar extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <List>
            <SubMenu name="文章">
            </SubMenu>

            <MenuItem link="/"></MenuItem>
          </List>
        </nav>

        <h1>叉烧 Beta</h1>
      </header>
    );
  }
}
