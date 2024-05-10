import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <div className="header">
        <img
          src="/images/timestack-logo.png"
          alt="Company Logo"
          className="logo"
        />
      </div>
      <div className="content-left">
        <h1 className="feature-text">
          <br />
          Empowering Your Workforce,
          <br />
          One Tick at a Time.
        </h1>
        <button
          className="login-button"
          onClick={() => {
            console.log("Trying to sign in...");
            navigate("/login");
          }}
        >
          Sign In
        </button>
        <button
          className="register-button"
          onClick={() => {
            console.log("Trying to create account...");
            navigate("/register");
          }}
        >
          Create Account
        </button>
        <button className="download-button">Download App</button>
      </div>
      <div className="content-right">
        <img src="/images/mobile-app-image.png" alt="Mobile App" />
      </div>
    </div>
  );
};

export default Home;
