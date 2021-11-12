import { EditorState } from "draft-js";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { Button, Card, Image } from "semantic-ui-react";
import { convertFromRaw } from 'draft-js';
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function PostDetails() {

  const { postStore } = useStore();
  const { selectedPost: post, openForm, cancelSelectedPost } = postStore;
  const [editorState] = useState(post === undefined ? EditorState.createEmpty() : EditorState.createWithContent(convertFromRaw(JSON.parse(post.body))));

  if (!post) return <LoadingComponent content='oops' />;

  return (
    <Card fluid>
      <Image src={"/assets/" + post.id + ".png"} />
      <Card.Content>
        <Card.Header>{post.title}</Card.Header>
        <Card.Meta>
          <span>{post.creationDate}</span>
        </Card.Meta>
        <Card.Description>
          {/* need to load up the json string of the body into an editor state */}
          {/* {post.body} */}

          <Editor
            readOnly
            toolbarHidden={true}
            wrapperClassName="rdw-storybook-wrapper"
            editorClassName="rdw-storybook-editor"
            editorState={editorState}
          />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          onClick={() => openForm(post.id)}
          basic
          color="blue"
          content="Edit"
        />
        <Button basic color="grey" content="Close" onClick={cancelSelectedPost} />
      </Card.Content>
    </Card>
  );
}
