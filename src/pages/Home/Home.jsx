import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout";
import Post from "../../component/post/Post";

const Home = () => {

  const [posts, setPosts] = useState();

  useEffect(() => {
     fetch('https://blog-backend-d16l.onrender.com/home/post', {
    }).then((response) => {
      response.json().then((posts) => {
        setPosts(posts.posts);
    })
  })
  }, [])

  return (
    <Layout>
      {posts && posts.map((post) => (
          <Post key={post._id} {...post}/>
      ))
      }
    </Layout>
  );
};

export default Home;
