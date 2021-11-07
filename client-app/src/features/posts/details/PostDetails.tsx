import { EditorState } from "draft-js";
import React, { useState } from "react";
import { Editor} from "react-draft-wysiwyg";
import { Button, Card, Image } from "semantic-ui-react";
import { Post } from "../../../app/models/post";
import { convertFromRaw } from 'draft-js';

interface Props {
  post: Post;
  cancelSelectPost: () => void;
  openForm: (id: string) => void;
}

export default function PostDetails({
  post,
  cancelSelectPost,
  openForm,
}: Props) {

  const [editorState, setState] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(post.body))));

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
        <Button basic color="grey" content="Close" onClick={cancelSelectPost} />
      </Card.Content>
    </Card>
  );
}
