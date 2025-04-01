import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/RegistrationForm";
import Login from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import './App.css'

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Navbar will be visible on all pages */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
