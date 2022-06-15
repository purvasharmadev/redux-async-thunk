import "./styles.css";

import PostList from "./components/postList";

// Redux does everything synchronously so anything asynchrounous
// has to happen outside the store for which we use middlewares
// the most common middleware is "redux-thunk"

// thunk: the word literally means "a piece of code that some delayed work"

export default function App() {
  return (
    <div className="App">
      <PostList />
    </div>
  );
}
