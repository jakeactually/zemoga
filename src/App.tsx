import React from 'react';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setPosts } from './store';
import { PostComponent } from './components/PostComponent';
import { Post } from './types/Post';

function App() {
  const dispath = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    if (posts.length) return;

    axios.get<{ data: Post[] }>('/assets/data.json').then(res => {
      dispath(setPosts(res.data.data));
    });  
  }, []);

  return (
    <div className="App">
      {posts.map((post, i) =>
        <PostComponent post={post} index={i} key={i} />
      )}
    </div>
  );
}

export default App;
