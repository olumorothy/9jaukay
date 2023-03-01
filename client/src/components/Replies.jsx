import React from "react";
import { useState } from "react";

export default function Replies() {
  const [reply, setReply] = useState("");

  const handleSubmitReply = (e) => {
    e.preventDefault();
    console.log({ reply });
    setReply("");
  };
  return (
    <main className="replies">
      <form className="modal-content" onSubmit={handleSubmitReply}>
        <label htmlFor="reply">Reply to the thread</label>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          name="reply"
          rows={5}
          typeof="text"
          className="modalInput"
        ></textarea>
        <button className="modalBtn">SEND</button>
      </form>
    </main>
  );
}
