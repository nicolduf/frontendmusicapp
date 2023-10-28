import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to open and close the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-container">
      <div
        className={`overlay ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      ></div>
      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <div className="menu-text" onClick={toggleMenu}>
          </div>
        </div>
        <div className="menu-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="menu-button" onClick={toggleMenu}>
        Menu
      </div>
    </div>
  );
}

export default Navbar;
