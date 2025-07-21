import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './signup.css'; 
import { setBodyBackground } from "../utils/setBodyBackground";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {
    let hasError = false;

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) return;

    if (localStorage.getItem(email)) {
      setEmailError("User already exists");
      return;
    }

    localStorage.setItem(email, JSON.stringify({ password }));
    navigate("/login");
  };

  useEffect(() => {
    setBodyBackground("linear-gradient(to right, #74ebd5, #9face6)");
    return () => setBodyBackground("");
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(""); 
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div><h2>Signup</h2></div>

      <div>
        <input
          className={` ${emailError ? "is-invalid" : "form-control"}`}
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <div className="text-danger mb-2">{emailError}</div>}
      </div>

      <div>
        <input
          className={` ${passwordError ? "is-invalid" : "form-control"}`}
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <div className="text-danger mb-2">{passwordError}</div>}
      </div>

      <div><button className="btn btn-primary w-100" onClick={handleSignup}>Signup</button></div>

      <p className="text-center mt-2">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
