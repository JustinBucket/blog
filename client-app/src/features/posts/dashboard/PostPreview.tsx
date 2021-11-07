import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label } from "semantic-ui-react";
import { Post } from "../../../app/models/post";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor} from "react-draft-wysiwyg";

interface Props {
  post: Post;
  selectPost: (id: string) => void;
  deletePost: (id: string) => void;
  submitting: boolean;
}

export default function PostPreview({ post, selectPost, deletePost, submitting }: Props) {
  const [target, setTarget] = useState("");

  const [editorState, setState] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(post.body))));

  function handlePostDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deletePost(id);
  }
  
  return (
    <Item key={post.id}>
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
            onClick={() => selectPost(post.id)}
            floated="right"
            content="Read"
            color="green"
          />
          <Button
            onClick={(e) => handlePostDelete(e, post.id)}
            floated="right"
            content="Delete"
            color="red"
            loading={submitting && target === post.id}
            name={post.id}
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}
