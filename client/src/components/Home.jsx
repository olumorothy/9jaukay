import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

export default function Home() {
  const [category, setCategory] = useState("");
  const [thread, setThread] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("_id")) {
        navigate("/");
      } else {
        console.log("Authenticated");
      }
    };
    checkUser();
  }, [navigate]);

  const handleCreateThread = (e) => {
    e.preventDefault();
    console.log({ thread, category });
    setThread("");
    setCategory("--Select a Category");
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <Nav />
      <main className="home">
        <h2 className="homeTitle">Create a new Thread</h2>
        <form className="homeForm" onSubmit={handleCreateThread}>
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
      </main>
    </>
  );
}
