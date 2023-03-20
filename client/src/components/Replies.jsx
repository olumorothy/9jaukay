import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";

export default function Replies() {
  const [reply, setReply] = useState("");
  const [replyList, setReplyList] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchReplies = () => {
      fetch("http://localhost:9098/api/thread/replies", {
        method: "POST",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setReplyList(data.replies);
          setTitle(data.title);
          console.log(replyList);
        })
        .catch((err) => console.error(err));
    };
    fetchReplies();
  }, [id]);

  const handleSubmitReply = (e) => {
    e.preventDefault();
    addReply();
    setReply("");
  };

  const addReply = () => {
    fetch("http://localhost:9098/api/create/reply", {
      method: "POST",
      body: JSON.stringify({
        id,
        userId: localStorage.getItem("_id"),
        reply,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };
  return (
    <main className="replies">
      <h1 className="repliesTitle">{title}</h1>
      <form className="modal-content" onSubmit={handleSubmitReply}>
        <label htmlFor="reply">Reply to the thread</label>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          name="reply"
          rows={5}
          typeof="text"
          className="modalInput"
        />
        <button className="modalBtn">SEND</button>
      </form>

      <div className="thread_container">
        {replyList.map((reply) => (
          <div className="thread_item">
            <p>{reply.text}</p>
            <div className="react_container">
              <p style={{ opacity: "0.5" }}>by {reply.name}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
