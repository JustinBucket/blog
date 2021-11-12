import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import PostPreview from "./PostPreview";

export default observer(function PostList() {

  const {postStore} = useStore();
  const {postsByDate} = postStore;

  return (
    <Segment>
      <Item.Group divided>
        {postsByDate.map((post) => (
          <PostPreview post={post} key={post.id}/>
        ))}
      </Item.Group>
    </Segment>
  );
})
