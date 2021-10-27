import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Post } from "../../../app/models/post";

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
  return (
    <Card fluid>
      <Image src={"/assets/" + post.id + ".png"} />
      <Card.Content>
        <Card.Header>{post.title}</Card.Header>
        <Card.Meta>
          <span>{post.creationDate}</span>
        </Card.Meta>
        <Card.Description>
          {/* this will need to be more complex? to handle the json */}
          {post.body}

          {/* <Editor
            readOnly
            toolbarClassName="rdw-storybook--toolbar"
            wrapperClassName="rdw-storybook-wrapper"
            editorClassName="rdw-storybook-editor"
          /> */}
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
