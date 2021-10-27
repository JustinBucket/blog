import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Post } from "../models/post";
import NavBar from "./navbar";
import BlogFooter from "./footer";
import PostDashboard from "../../features/posts/dashboard/PostDashboard";
import {v4 as uuid} from 'uuid';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getPosts();
    getTypes();
  }, []);

  function getPosts() {
    axios.get("http://localhost:5000/post").then((response) => {
      setPosts(response.data);
    });
  }

  function getTypes() {
    axios.get("http://localhost:5000/post/type").then((response) => {
      setTypes(response.data);
    });
  }

  function handleSelectPost(id: string) {
    setSelectedPost(posts.find((x) => x.id === id));
  }

  function handleCancelSelect() {
    setSelectedPost(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectPost(id) : handleCancelSelect();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditPost(post: Post) {
    post.id ? setPosts([...posts.filter(x => x.id !== post.id), post])
    : setPosts([...posts, {...post, id: uuid()}]);
    setEditMode(false);
    setSelectedPost(post);
  }

  function handleDeletePost(id: string) {
    setPosts([...posts.filter(x => x.id !== id)]);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{ marginTop: "7em" }}>
        <PostDashboard
          posts={posts}
          types={types}
          selectedPost={selectedPost}
          selectPost={handleSelectPost}
          cancelSelectPost={handleCancelSelect}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditPost}
          deletePost={handleDeletePost}
        />
      </Container>
      <BlogFooter />
    </>
  );
}

export default App;