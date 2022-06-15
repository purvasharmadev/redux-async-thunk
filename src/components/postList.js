import { useState } from "react";
import { v4 as uuid } from "uuid";

import { useSelector, useDispatch } from "react-redux";
import { postAdd } from "../features/postSlice";
import { v4 } from "uuid";

export default function PostList() {
  const list = useSelector((state) => state.post.value);
  console.log("list ", list);
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    id: uuid(),
    title: "",
    content: ""
  });

  console.log("post ", post);

  const clickHandler = (e) => {
    e.preventDefault();
    console.log("clicked! ", post);
    dispatch(postAdd(post));
  };
  return (
    <div>
      <h1>Hello PostList</h1>

      <div>
        <form onSubmit={clickHandler}>
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
        </form>
      </div>

      <div className="flex flex-wrap flex-space-center">
        {list.map((item) => {
          return (
            <div className="card m-1 p-1" key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
