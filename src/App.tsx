import React, { useState } from 'react';
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
  const [display, setDisplay] = useState('list');

  useEffect(() => {
    if (posts.length) return;

    axios.get<{ data: Post[] }>('/assets/data.json').then(res => {
      dispath(setPosts(res.data.data));
    });  
  }, []);

  return (
    <div className="App">
      <select
        id="view-selector"
        value={display}
        onChange={ev => setDisplay(ev.target.value)}>
        <option value="list">List</option>
        <option value="grid">Grid</option>
      </select>

      <main className={display}>
        <div id="content">
          {posts.map((post, i) =>
            <PostComponent post={post} index={i} key={i} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
