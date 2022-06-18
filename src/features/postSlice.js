import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base url
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// intial state
const intialStateValue = {
  posts: [],
  status: "idle", // 'idle'| 'loading'|'succeded'|'failed'
  error: null
};

// fetchPost

export const fetchPost = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const res = await axios.get(POSTS_URL);
    return res.data.sort((a, b) => b.id - a.id);
  } catch (error) {
    console.error("error is ", error);
  }
});

// addPost

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (intialPost) => {
    try {
      const res = await axios.post(POSTS_URL, intialPost);
      console.log("res ", res);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: intialStateValue,
  reducers: {
    postList: (state) => {
      return state.posts;
    }
  },

  // extraReducers is used for for the actions that are not genrated from the slice.
  // it takes a builder paramater which is an object that let use define additional case reducers that run in
  //  response to the actions defined outside the slice

  extraReducers(builder) {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeded";
        state.posts = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        console.log("newPost ", action.payload);
        state.posts.push(action.payload);
      });
  }
});

export const selectAllPost = (state) => state.post.posts;
export const getPostStatus = (state) => state.post.status;
export const getPostError = (state) => state.post.error;

export const { postAdd } = postSlice.actions;

export default postSlice.reducer;
