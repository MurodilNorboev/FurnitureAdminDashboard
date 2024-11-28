import React from "react";
import { FaBell, FaMoon, FaSearch } from "react-icons/fa";
import './app.css'

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="welcome">
        <h2>Welcome Alex 👋</h2>
        <p>Here's what's happening with your store today.</p>
      </div>
      <div className="header-icons">
        <FaSearch className="icon" />
        <FaMoon className="icon" />
        <FaBell className="icon" />
        <div className="profile">
          <span>Alex Mora</span>
          <img
            src="https://via.placeholder.com/40"
            alt="profile"
            className="profile-pic"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
