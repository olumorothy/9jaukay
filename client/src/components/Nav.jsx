import React from "react";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("_id");
    navigate("/");
  };
  return (
    <nav className="navbar">
      <h2>9jaukay</h2>
      <div className="navbarRight">
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </nav>
  );
}
