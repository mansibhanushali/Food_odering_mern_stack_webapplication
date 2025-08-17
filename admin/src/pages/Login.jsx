import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { adminDataContext } from "../context/AdminContext";
import { FaUser, FaLock } from "react-icons/fa";
import './Login.css';

function Login() {
  const { login } = useContext(adminDataContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      login({ username });
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-bg">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>ADMIN LOGIN</h2>

        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
        <p className="lost-password">Forgot Password?</p>
      </form>
    </div>
  );
}

export default Login;
