import R from "ramda";
import React from "react";
import List from "./List";

export default class Menu extends React.Component {
  render() {
    const content = this.props.content
        , Wrapper = this.props.wrapper || "div"
        , className = R.join(" ", ["menu", this.props.className])
        , contentDiv = content ?
          <div className="content">{content}</div> :
          undefined;

    return (
      <Wrapper className={className}>
        {contentDiv}
        <List>{this.props.children}</List>
      </Wrapper>
    );
  }
}
