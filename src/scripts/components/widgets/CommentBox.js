import React from "react";

import Comment from "./Comment";
import CommentForm from "./CommentForm";
import apiPath from "../../core/apiPath";

export default class CommentBox extends React.Component {
  render() {
    const {
      user,
      comments,
      commentableId,
      commentableType
    } = this.props;

    const commentItems = comments.map((comment) => {
      return <Comment key={comment.id} comment={comment} />;
    });

    const form = user.id &&
          <CommentForm commentableId={commentableId}
                       commentableType={commentableType}
                       action={apiPath("comments")}
                       method="post"
                       user={user} />;

    return (
      <div className="comment-box">
        {form}
        {commentItems}
      </div>
    );
  }
};
