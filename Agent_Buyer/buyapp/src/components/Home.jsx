import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Your Dream Home Awaits</h1>
      <p className="home-subtext">Find the perfect property tailored just for you.</p>
      <div className="home-buttons">
        <Link to="/register" className="home-btn primary">Get Started</Link>
        <Link to="/login" className="home-btn secondary">Login</Link>
      </div>
    </div>
  );
}

export default Home;
