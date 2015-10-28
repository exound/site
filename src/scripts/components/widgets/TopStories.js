import React from "react";
import StoryItem from "./StoryItem";
import hasInterval from "../../decorators/hasInterval";

@hasInterval
export default class TopStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cursor: 0};
  }

  componentDidMount() {
    this.setInterval(this.goRight, 4000);
  }

  get stories() {
    return this.props.stories;
  }

  get cursor() {
    return this.state.cursor;
  }

  set cursor(cursor) {
    this.setState({cursor});
    return cursor;
  }

  get last() {
    return this.stories.length - 1;
  }

  goLeft = () => {
    if (this.cursor !== 0) {
      this.cursor = this.cursor - 1;
    } else {
      this.cursor = this.last;
    }
  };

  goRight= () => {
    if (this.cursor !== this.last) {
      this.cursor = this.cursor + 1;
    } else {
      this.cursor = 0;
    }
  };

  render() {
    const storyStyle = {
      flex: `0 0 calc(100% / ${this.stories.length})`
    };

    const storyItems = this.stories.map(story => {
      return <StoryItem style={storyStyle} key={story.id} story={story} />;
    });

    const storiesStyle = {
      width: `${this.stories.length * 100}%`,
      left: `-${this.cursor * 100}%`
    };

    return (
      <div className="top-stories upper">
        <div className="stories" style={storiesStyle}>
          {storyItems}
        </div>

        <button className="go left fa fa-chevron-left"
                onClick={this.goLeft} />

        <button className="go right fa fa-chevron-right"
                onClick={this.goRight} />
      </div>
    );
  }
}
