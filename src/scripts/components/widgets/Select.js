import R from "ramda";
import React from "react";
import {DropDownMenu} from "material-ui";

export default class Select extends React.Component {
  componentWillMount() {
    const {
      current,
      data
    } = this.props;

    const index = R.indexOf(current, data);

    this.state = {index: index >= 0 ? index + 1 : 0};
  }

  get items() {
    return R.concat([{text: "(无)"}], this.props.data.map(datum => {
      return {text: datum};
    }));
  }

  get value() {
    return R.concat([undefined], this.props.data)[this.state.index];
  }

  onSelect = (_, index) => {
    this.setState({index});
  };

  render() {
    const style = {
      width: 200,
      marginTop: -4,
      marginRight: -4
    };

    return (
      <DropDownMenu ref="select"
                    autoWidth={false}
                    onChange={this.onSelect}
                    selectedIndex={this.state.index}
                    style={R.merge(this.props.style, style)}
                    underlineStyle={{borderTop: "none"}}
                    menuItems={this.items} />
    );
  }
};
