import React from "react";
import logo from "../assets/logo.jpeg";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo-section">
          <img src={logo} alt="CodeWeb Telecom Logo" className="logo-img" />
          <div>
            <h1 className="logo-text">Code Web Telecom</h1>
            <p className="tagline">Your Digital Service Partner</p>
          </div>
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="cta-btn">Get Started</button>
      </nav>
    </header>
  );
};

export default Header;
