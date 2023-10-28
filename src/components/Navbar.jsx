import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="menu-text" onClick={toggleMenu}></div>
        </div>
        <div className="menu-links">
          <ul>
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
