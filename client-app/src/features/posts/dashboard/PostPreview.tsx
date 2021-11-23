import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label } from "semantic-ui-react";
import { Post } from "../../../app/models/post";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor} from "react-draft-wysiwyg";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface Props {
  post: Post;
}

export default observer(function PostPreview({ post }: Props) {

  const {postStore} = useStore();
  const {deletePost, loading} = postStore;

  const [target, setTarget] = useState("");

  const [editorState] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(post.body))));

  function handlePostDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deletePost(id);
  }
  
  return (
    <Item>
      <Item.Image src={"/assets/" + post.id + ".png"} alt="post image" />
      <Item.Content>
        <div className="headers">
          <Item.Header as="h1">{post.title}</Item.Header>
          <Item.Header as="h2">{post.subtitle}</Item.Header>
        </div>
        <Item.Meta>{post.creationDate}</Item.Meta>
        <Item.Description>
          {/* <div>{post.body}</div> */}
          <Editor
            readOnly
            toolbarHidden={true}
            wrapperClassName="rdw-storybook-wrapper"
            editorClassName="rdw-storybook-editor"
            editorState={editorState}
          />
        </Item.Description>
        <Item.Extra>
          <Label
            basic
            content={post.typeString}
            className={post.typeString.replace(" ", "")}
          />
          <Button
            as={Link} to={`/posts/${post.id}`}
            floated="right"
            content="Read"
            color="green"
          />
          <Button
            onClick={(e) => handlePostDelete(e, post.id)}
            floated="right"
            content="Delete"
            color="red"
            loading={loading && target === post.id}
            name={post.id}
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
})
