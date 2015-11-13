import R from "ramda";
import React from "react";

import Comment from "./Comment";
import Link from "./Link";
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

    const commentItems = !R.isEmpty(comments) && comments.map((comment) => {
      return <Comment key={comment.id} comment={comment} />;
    });

    const form = user.id ?
          <CommentForm commentableId={commentableId}
                       commentableType={commentableType}
                       action={apiPath("comments")}
                       method="post"
                       user={user} /> :
          <div className="please-login">
            请<Link to="/sign_in">登录</Link>后发表评论
          </div>;

    return (
      <div className="comment-box">
        {form}
        {commentItems}
      </div>
    );
  }
};
