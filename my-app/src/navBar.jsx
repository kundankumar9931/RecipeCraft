import React, { useState, useEffect } from "react";
import "./navBar.css";
import logo from "./assets/Untitled.png";  

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDarkMode]);

  // Update username when localStorage changes (useful on full page reloads)
  useEffect(() => {
    const u = localStorage.getItem("username") || "";
    setUsername(u);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="navbar">

      {/* Logo Section */}
      <div className="navbar-brand">
        <img src={logo} alt="Recipe Craft Logo" className="logo" />
        <h2>RecipeCraft</h2>
      </div>

      {/* Links */}
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/Recipes">Recipes</a></li>
        <li><a href="/MealPlanner">Meal Planner</a></li>
        <li><a href="/About">About</a></li>

        {username ? (
          <> 
            <li className="nav-user">Hello, {username}</li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("username");
                  setUsername("");
                  window.location.href = "/";
                }}
                className="logout-btn"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign Up</a></li>
          </>
        )}

        <li className="dark-mode-toggle">
          <button
            onClick={toggleDarkMode}
            className="toggle-btn"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;
