import React from "react";
import logo from "../assets/logo.jpeg";
import "./CSS/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log("Get Started clicked");
    navigate("/login");
  };
  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo-section">
          <img
            src={logo}
            alt="Code Web Telecom Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
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
          <a href="#webSolutions">Web Solutions</a>
        </div>
        <button className="cta-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </nav>
    </header>
  );
};

export default Header;
