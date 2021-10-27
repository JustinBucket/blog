import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import {
  Button,
  Divider,
  DropdownProps,
  Form,
  Segment,
} from "semantic-ui-react";
import { Post } from "../../../app/models/post";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

interface Props {
  types: string[];
  post: Post | undefined;
  closeForm: () => void;
  createOrEdit: (post: Post) => void;
}

export default function PostForm({
  types,
  post: selectedPost,
  closeForm,
  createOrEdit
}: Props) {
  const initialState = selectedPost ?? {
    id: "",
    title: "",
    subtitle: "",
    body: "",
    creationDate: "",
    typeString: "",
  };

  const typeOptions = [
    // need to get these from the server?
    { key: "Music", value: "Music", text: "Music" },
    { key: "Book", value: "Book", text: "Book" },
    { key: "VideoGame", value: "Video Game", text: "Video Game" },
    { key: "Movie", value: "Movie", text: "Movie" },
  ];

  const [post, setPost] = useState(initialState);
  // below causes error because the bodies aren't proper JSON yet, see about converting them?
  // const [editorState, setState] = useState(selectedPost === null ? EditorState.createEmpty() : JSON.parse(post.body));
  const [editorState, setState] = useState(EditorState.createEmpty());

  function handleSubmit() {
    createOrEdit(post);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  }

  function handleSelectChange(
    event: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) {
    console.log(data.value);
    if (data.value) {
      setPost({ ...post, typeString: data.value.toString() });
    }
  }

  function handleEditorStateChange(editorState: EditorState) {
    setState(editorState);
    setPost({...post, 'body': JSON.stringify(editorState, null, 4)})
  }

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
        <Button floated="right" positive type="submit" content="Post"/>
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={closeForm}
        />
      </Form>
    </Segment>
  );
}
