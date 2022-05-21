import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const initialState = {
  posts: [] as Post[],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    voteUp: (state, action) => {
      const index = action.payload;
      state.posts[index].votes.positive += 1;
    },
    voteDown: (state, action) => {
      const index = action.payload;
      state.posts[index].votes.negative += 1;
    },
  },
});

export const {
    setPosts,
    voteUp,
    voteDown,
} = postsSlice.actions;

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  posts: postsSlice.reducer,
});

export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
