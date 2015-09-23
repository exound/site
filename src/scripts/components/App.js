import React from "react";
import MenuBar from "./widgets/MenuBar";

export default class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <MenuBar />
        {this.props.children}
      </div>
    );
  }
}
