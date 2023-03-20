import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";
import Likes from "./Likes";
import Nav from "./Nav";

export default function Home() {
  const [category, setCategory] = useState("");
  const [thread, setThread] = useState("");
  const [threadList, setThreadList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("_id")) {
        navigate("/");
      } else {
        fetch("http://localhost:9098/api/all/threads")
          .then((res) => res.json())
          .then((data) => setThreadList(data.threads))
          .catch((err) => console.log(err));
      }
    };
    checkUser();
  }, [navigate]);

  const handleCreateThread = (e) => {
    e.preventDefault();
    createThread();
    setThread("");
    setCategory("--Select a Category");
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const createThread = () => {
    fetch("http://localhost:9098/api/create/thread", {
      method: "POST",
      body: JSON.stringify({
        thread,
        category,
        userId: localStorage.getItem("_id"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
        setThreadList(data.threads);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createThread();
    setThread("");
  };

  return (
    <>
      <Nav />
      <main className="home">
        <h2 className="homeTitle">Create a new Thread</h2>
        <form className="homeForm" onSubmit={handleSubmit}>
          <div className="home-container">
            <label htmlFor="thread">Title</label>
            <input
              type="text"
              name="thread"
              required
              value={thread}
              onChange={(e) => setThread(e.target.value)}
            />
            <label htmlFor="category">Category</label>
            <select value={category} onChange={handleCategoryChange}>
              <option value="">--Select a Category</option>
              <option value="education">Education</option>
              <option value="music">Music</option>
              <option value="programming">Programming</option>
              <option value="travel">Travel</option>
            </select>
          </div>
          <button className="homeBtn">CREATE THREAD</button>
        </form>

        <div className="thread_container">
          {threadList.map((thread) => (
            <div className="thread_item" key={thread.id}>
              <p>{thread.title}</p>
              <p>{thread.category}</p>
              <div className="react_container">
                <Likes
                  numberOfLikes={thread.likes.length}
                  threadId={thread.id}
                />
                <Comments
                  numberOfComments={thread.replies.length}
                  threadId={thread.id}
                  title={thread.title}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
