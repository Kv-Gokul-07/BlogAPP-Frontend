import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

import "./Post.scss";

const Post = ({ _id, author, title, summary, cover, content, createdAt }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:3001/${cover}`} alt="Cover Image" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.userName}</a>
          <time>
            {formatISO9075(new Date(createdAt), "MMMM d, yyyy HH:mm")}
          </time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
