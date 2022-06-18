import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { useSelector, useDispatch } from "react-redux";
import {
  addNewPost,
  fetchPost,
  selectAllPost,
  getPostError,
  getPostStatus
} from "../features/postSlice";

export default function PostList() {
  const post = useSelector(selectAllPost);
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPost());
    }
  }, [postStatus, dispatch]);
  const [newPost, setNewPost] = useState({
    id: uuid(),
    title: "",
    body: ""
  });

  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(addNewPost(newPost));
    setNewPost({ ...newPost, body: "", title: "" });
  };

  return (
    <div>
      <h1>Hello PostList</h1>
      {postStatus === "loading" && <h1>Loading...</h1>}
      {postError}
      <div>
        <form onSubmit={clickHandler}>
          <input
            value={newPost.title}
            onChange={(e) => {
              setNewPost({ ...newPost, title: e.target.value });
            }}
            type="text"
            placeholder="enter title"
          />
          <input
            value={newPost.body}
            onChange={(e) => {
              setNewPost({ ...newPost, body: e.target.value });
            }}
            type="text"
            placeholder="enter content"
          />
          <button className="btn" type="submit">
            Add
          </button>
        </form>
      </div>

      <div className="flex flex-wrap flex-space-center">
        {post &&
          post.map((item) => {
            return (
              <div className="card m-1 p-1" key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
