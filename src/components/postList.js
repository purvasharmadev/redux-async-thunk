import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { useSelector, useDispatch } from "react-redux";
import {
  postAdd,
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
  // const [post, setPost] = useState({
  //   id: uuid(),
  //   title: "",
  //   content: ""
  // });

  // const clickHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(postAdd(post));
  // };

  return (
    <div>
      <h1>Hello PostList</h1>
      {postStatus === "loading" && <h1>Loading...</h1>}
      {postError}
      <div>
        {/* <form onSubmit={clickHandler}>
          <input
            value={post.title}
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
            type="text"
            placeholder="enter title"
          />
          <input
            value={post.content}
            onChange={(e) => {
              setPost({ ...post, content: e.target.value });
            }}
            type="text"
            placeholder="enter content"
          />
          <button className="btn" type="submit">
            Add
          </button>
        </form> */}
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
