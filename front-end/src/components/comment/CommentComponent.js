import React from "react";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const CommentComponent = () => {
  const actions = [
    <Link to="/Reply">
      <span key="comment-basic-reply-to">Reply to</span>
    </Link>,
  ];
  return (
    <Comment
      actions={actions}
      author={<p>Han Solo</p>}
      avatar={<Avatar alt="Han Solo" />}
      content={
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      }
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default CommentComponent;
