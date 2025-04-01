import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Home Icon
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Convert localStorage string to object (or null if not found)
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // Update navbar when localStorage changes (Login/Logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")) || null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null); // Update state so navbar re-renders
    navigate("/");
  };

  // Update user state on login as well, if user is logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [location.pathname]); // Re-run on location change (useful for redirect after login)

  return (
    <nav className="navbar">
      <h3 className="logo">Real Estate App</h3>

      <div className="nav-buttons">
        {/* 🏠 Home Button - Only visible if not on the Home page */}
        {location.pathname !== "/" && (
          <button className="nav-button home-btn" onClick={() => navigate("/")}>
            <FaHome className="home-icon" /> Home
          </button>
        )}

        {/* 📝 Conditional Button Display */}
        {user ? (
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        ) : location.pathname === "/login" ? (
          <button className="nav-button" onClick={() => navigate("/register")}>
            Register
          </button>
        ) : location.pathname === "/register" ? (
          <button className="nav-button" onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <>
            <button className="nav-button" onClick={() => navigate("/register")}>
              Register
            </button>
            <button className="nav-button" onClick={() => navigate("/login")}>
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
