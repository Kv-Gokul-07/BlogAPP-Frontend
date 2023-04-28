import "./App.css";

import { Route, Routes } from "react-router-dom";

// import Layout from "./component/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import { UserContextProvider } from "./ReactContext/UserContext";
import CreatePost from "./pages/Post/CreatePost";
import PostPage from "./pages/PostPage/PostPage";
import EditPost from "./pages/Post/EditPost";

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route index path={"/"} element={<Home />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/create"} element={<CreatePost />} />
      <Route path={"/post/:id"} element={<PostPage />} />
      <Route path={"/edit/:id"} element={<EditPost />} />
    </Routes>
    </UserContextProvider>
  );
}

export default App;
