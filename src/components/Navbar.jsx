import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar-container">
      <div className={`overlay ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}></div>
      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-text" onClick={toggleMenu}>
          <div className="close-button" onClick={closeMenu}>
            (X)
          </div>
        </div>
        <div className="menu-links">
          <ul>
          <li>
              <Link to="/songs">Songs</Link>
            </li>
            <li>
              <Link to="/artists">Artists</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
      <Link to="/">Home</Link>
      <div className="menu-button" onClick={toggleMenu}>
        Menu
      </div>
    </div>
  );
}

export default Navbar;
