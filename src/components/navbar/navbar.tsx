import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar-styles.css";
import {DEFAULT_CONFIG} from "../../config/config.ts";
import {useUser} from "../../context/context.tsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user, setUser} = useUser()

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    setUser(null);
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">{DEFAULT_CONFIG.shortAppName}</Link>
      </div>
      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li>
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/search" onClick={() => setIsOpen(false)}>
            Search
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={logout}>
            Logout
          </Link>
        </li>
        <li>
          <img src={user.avatar} width="30" alt={user.name}/>
        </li>
      </ul>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;