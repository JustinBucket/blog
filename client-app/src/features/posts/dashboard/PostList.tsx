import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Post } from "../../../app/models/post";

interface Props {
  posts: Post[];
  selectPost: (id: string) => void;
  deletePost: (id: string) => void;
}

export default function PostList({ posts, selectPost, deletePost }: Props) {
  return (
    <Segment>
      <Item.Group divided>
        {posts.map((post) => (
          <Item key={post.id}>
            <Item.Image src={"/assets/" + post.id + ".png"} alt="post image" />
            <Item.Content>
              <Item.Header as="a">{post.title}</Item.Header>
              <Item.Meta>{post.creationDate}</Item.Meta>
              <Item.Description>
                <div>{post.subtitle}</div>
                <div>{post.body}</div>
              </Item.Description>
              <Item.Extra>
                <Label
                  basic
                  content={post.typeString}
                  className={post.typeString.replace(" ", "")}
                />
                <Button onClick={() => selectPost(post.id)} floated="right" content="Read" color="green"/>
                <Button onClick={() => deletePost(post.id)} floated="right" content="Delete" color="red"/>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
