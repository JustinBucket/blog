import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import {
  Button,
  Divider,
  DropdownProps,
  Form,
  Segment,
} from "semantic-ui-react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { link } from "fs";


export default observer(function PostForm() {

  const { postStore } = useStore();
  const { createPost, updatePost, loading, loadPost, loadingInitial } = postStore;
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [post, setPost] = useState({
    id: "",
    title: "",
    subtitle: "",
    body: "",
    creationDate: "",
    typeString: "",
  })

  const [editorState, setState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (id) {
      loadPost(id).then(post => {
        setPost(post!)
        setState(EditorState.createWithContent(convertFromRaw(JSON.parse(post!.body))))
      });
    }
  }, [id, loadPost])

  const typeOptions = [
    // need to get these from the server?
    { key: "Music", value: "Music", text: "Music" },
    { key: "Book", value: "Book", text: "Book" },
    { key: "VideoGame", value: "Video Game", text: "Video Game" },
    { key: "Movie", value: "Movie", text: "Movie" },
  ];


  function handleSubmit() {
    post.creationDate = new Date().toISOString();
    if (post.id.length === 0) {
      let newPost = {
        ...post,
        id: uuid()
      };
      createPost(newPost).then(() => history.push(`/posts/${newPost.id}`));
    } else {
      updatePost(post).then(() => history.push(`/posts/${post.id}`));
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  }

  function handleSelectChange(
    event: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) {
    if (data.value) {
      setPost({ ...post, typeString: data.value.toString() });
    }
  }

  function handleEditorStateChange(editorState: EditorState) {
    setState(editorState);
    setPost({ ...post, 'body': JSON.stringify(convertToRaw(editorState.getCurrentContent())) });
  }

  if (loadingInitial) return <LoadingComponent content='Loading post...'/>

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={post.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Subtitle"
          value={post.subtitle}
          name="subtitle"
          onChange={handleInputChange}
        />
        <Form.Select
          options={typeOptions}
          placeholder="Select post type ..."
          value={post.typeString}
          name="type"
          onChange={handleSelectChange}
        />
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={handleEditorStateChange}
        />
        {/* <Form.Input placeholder="Image path - should be an upload input" /> */}
        <Divider />
        <Button loading={loading} floated="right" positive type="submit" content="Post" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          as={link} to='/posts'
        />
      </Form>
    </Segment>
  );
})
