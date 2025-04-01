import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa"; // Import icons
import "../styles/LoginForm.css"; // Import styles

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", { email, password });

      if (response.status === 200) {
        const { user_id, role_name } = response.data;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", user_id);
        localStorage.setItem("role", role_name);

        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid Email or Password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="login-input-group">
            <FaUser className="login-icon" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="login-input-group">
            <FaLock className="login-icon" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {error && <p className="login-error">{error}</p>}
        <p className="login-register-text">
          Don't have an account? <Link className="login-register-link" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
