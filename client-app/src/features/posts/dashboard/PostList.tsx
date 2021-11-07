import React, { SyntheticEvent, useState } from "react";
import { Button, HeaderSubheader, Item, Label, Segment } from "semantic-ui-react";
import { Post } from "../../../app/models/post";
import PostPreview from "./PostPreview";

interface Props {
  posts: Post[];
  selectPost: (id: string) => void;
  deletePost: (id: string) => void;
  submitting: boolean;
}

export default function PostList({ posts, selectPost, deletePost, submitting }: Props) {

  return (
    <Segment>
      <Item.Group divided>
        {posts.map((post) => (
          <PostPreview post={post} selectPost={selectPost} deletePost={deletePost} submitting={submitting}/>
        ))}
      </Item.Group>
    </Segment>
  );
}
