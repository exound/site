import R from "ramda";
import React from "react";
import feq from "../../core/feq";
import apiPath from "../../core/apiPath";

export default class LoadMore extends React.Component {
  componentDidMount() {
    this.setState({offset: this.props.offset});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url != this.props.url) {
      this.setState({offset: nextProps.offset});
    }
  }

  loadMore = () => {
    const {limit, url} = this.props;

    feq.get(apiPath(url, {
      limit: limit,
      offset: this.state.offset
    })).then(({body}) => {
      if (body.length) {
        this.props.mount.value = R.concat(
          this.props.mount.value,
          body
        );

        this.setState({offset: this.state.offset + limit});
      }
    });
  };

  render() {
    const text = this.props.text || "更 多";

    return (
      <div className="load-more">
        <button onClick={this.loadMore}>{text}</button>
      </div>
    );
  }
};
