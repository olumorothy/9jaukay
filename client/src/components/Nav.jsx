import React from "react";

export default function Nav() {
  const handleSignOut = () => {
    alert("User signed out");
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
