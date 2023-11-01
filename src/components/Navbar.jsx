import React, { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { AuthContext } from "../contexts/AuthContext";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {logOutUser} = useContext(AuthContext);
  const navigate = useNavigate()

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
            <li>
              <button className="logout-button" type="button" onClick={ async()=>{await logOutUser();navigate("/login")}}>Logout</button>
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
