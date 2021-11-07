import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Post } from "../models/post";
import NavBar from "./navbar";
import BlogFooter from "./footer";
import PostDashboard from "../../features/posts/dashboard/PostDashboard";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getPosts();
    getTypes();
  }, []);

  function getPosts() {
    agent.Posts.list().then(reponse => {
      let posts: Post[] = [];
      reponse.forEach(post => {
        post.creationDate = post.creationDate.split('T')[0];
        posts.push(post);
      })
      setPosts(reponse);
    })
  }

  function getTypes() {
    agent.Posts.types().then(response => {
      setTypes(response);
      setLoading(false);
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
    setSubmitting(true);

    if (post.id) {
      agent.Posts.update(post).then(() => {
        post.id ? setPosts([...posts.filter(x => x.id !== post.id), post])
        : setPosts([...posts, {...post, id: uuid()}]);

        setSelectedPost(post);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      post.id = uuid();
      post.creationDate = new Date().toISOString();
      agent.Posts.create(post).then(() => {
        setPosts([...posts, post]);

        setSelectedPost(post);
        setEditMode(false);
        setSubmitting(false);
      });

    }
  }

  function handleDeletePost(id: string) {
    setSubmitting(true);
    agent.Posts.delete(id).then(() => {
      setPosts([...posts.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading app'/>

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
          submitting={submitting}
        />
      </Container>
      <BlogFooter />
    </>
  );
}

export default App;
