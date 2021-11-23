import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { Button, Card, Image } from "semantic-ui-react";
import { convertFromRaw } from 'draft-js';
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useParams } from "react-router";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function PostDetails() {

  const { postStore } = useStore();
  const { selectedPost: post, loadPost, loadingInitial } = postStore;
  const [editorState] = useState(post === undefined ? EditorState.createEmpty() : EditorState.createWithContent(convertFromRaw(JSON.parse(post.body))));
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadPost(id);
  }, [id, loadPost]);

  if (loadingInitial || !post) return <LoadingComponent content='oops' />;

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
          as={Link}
          to={`/manage/${post.id}`}
          basic
          color="blue"
          content="Edit"
        />
        <Button as={Link} to='/posts' basic color="grey" content="Close" />
      </Card.Content>
    </Card>
  );
})
