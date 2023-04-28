import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../ReactContext/UserContext";
import "./Header.css";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const userName = userInfo?.userName;

  const url = window.location.href;
  const splittedUrl = url.split("/")[3];

  useEffect(() => {
    fetch("https://blog-backend-d16l.onrender.com/auth/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch("https://blog-backend-d16l.onrender.com/auth/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  return (
    <header>
      <a href="/" className="logo">
        MyBlog
      </a>
      <nav>
        {userName && (
          <>
            {splittedUrl !== "create" ? <Link to="/create">Create New Post</Link> : <Link to="/">Home</Link> }
            <a onClick={() => logout()}>Logout</a>
          </>
        )}
        {!userName && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
