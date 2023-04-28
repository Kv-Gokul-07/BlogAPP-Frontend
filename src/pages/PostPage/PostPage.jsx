import { formatISO9075 } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CustomButton from "../../component/common/Button/CustomButton";
import Layout from "../../component/Layout/Layout";
import { UserContext } from "../../ReactContext/UserContext";
import "./PostPage.scss";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState();
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://blog-backend-d16l.onrender.com/home/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    <Layout>
      <div className="post-page">
        <div className="image">
          <img src={`https://blog-backend-d16l.onrender.com/${postInfo?.postDoc?.cover}`} />
        </div>
        <div className="title">
          <h1>{postInfo?.postDoc?.title}</h1>
          <Link to={`/edit/${postInfo?.postDoc?._id}`}>
            {userInfo.id === postInfo?.postDoc?.author?._id && (
              <CustomButton btnClass={"EditBtn"} name="Edit this Article" />
            )}
          </Link>
        </div>
        <div className="author">
          <h2>{postInfo?.postDoc?.author?.userName}</h2>
          <time>{formatISO9075(new Date(postInfo?.postDoc?.createdAt))}</time>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postInfo?.postDoc?.content }}
        />
      </div>
    </Layout>
  );
};

export default PostPage;
