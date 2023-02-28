import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="login">
      <h1 className="loginTitle">Log into your account</h1>
      <form className="loginForm">
        <label htmlFor="email">Email Address</label>
        <input type="text" name="email" id="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
        <button className="loginBtn">SIGN IN</button>
        <p>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </main>
  );
}
