import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/post').then(response => {
      console.log(response);
      setPosts(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='comment' content='Blog'/>
        <List>
          {posts.map((post: any) => (
            <List.Item key={post.id}>
              {post.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
