import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaUsers } from "react-icons/fa";
import "../styles/RegistrationForm.css"; 

const RegistrationForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contact: "",
    role: "Buyer",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:8080/api/users/register", user);
      alert("Registration Successful!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="register-input-group">
            <FaUser className="register-icon" />
            <input type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={handleChange} required />
          </div>
          <div className="register-input-group">
            <FaUser className="register-icon" />
            <input type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleChange} required />
          </div>
          <div className="register-input-group">
            <FaEnvelope className="register-icon" />
            <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
          </div>
          <div className="register-input-group">
            <FaLock className="register-icon" />
            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
          </div>
          <div className="register-input-group">
            <FaPhone className="register-icon" />
            <input type="text" name="contact" placeholder="Contact" value={user.contact} onChange={handleChange} required />
          </div>
          <div className="register-input-group">
            <FaUsers className="register-icon" />
            <select name="role" value={user.role} onChange={handleChange}>
              <option value="Buyer">Buyer</option>
              <option value="Agent">Agent</option>
            </select>
          </div>
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <p className="register-error">{error}</p>}
          <p className="register-login-text">Already have an account? <Link className="register-login-link" to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
