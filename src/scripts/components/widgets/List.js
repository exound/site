import React from "react";

export default class List extends React.Component {
  render() {
    return (
      <ul>
        {React.Children.map(this.props.children, child => <li>{child}</li>)}
      </ul>
    );
  }
}
