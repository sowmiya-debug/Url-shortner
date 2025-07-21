import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './login.css';
import { setBodyBackground } from "../utils/setBodyBackground";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    // Input validation
    if (!email) {
      setEmailError("Email is required.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    }

    if (hasError) return;

    try {
      const storedUser = localStorage.getItem(email);

      if (!storedUser) {
        setEmailError("User not found. Please sign up first.");
        return;
      }

      const user = JSON.parse(storedUser);

      if (user.password === password) {
        localStorage.setItem("currentUser", email);
        navigate("/dashboard");
      } else {
        setPasswordError("Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setEmailError("Something went wrong. Try again.");
    }
  };

   useEffect(() => {
   setBodyBackground("linear-gradient(to right, #ffecd2, #fcb69f)");
   return () => setBodyBackground("");
 }, []);

  return (
    <div className="ls">
    <div className="container mt-5">
      <h2>Login</h2>
      <input className={` ${emailError ? "input-error" : "form-control"}`} placeholder="Enter Email" 
        onChange={e => {setEmail(e.target.value) ;
        if (emailError) setEmailError("");}} />
      {emailError && (
            <div className="error-message">
            {emailError}
            
            </div>
          )}
      <input className={` ${emailError ? "input-error" : "form-control"}`} type="password" 
      placeholder="Enter Password" 
      onChange={e => {setPassword(e.target.value)
        if (passwordError) setPasswordError("");
      }} />
      {passwordError && (
            <div className="error-message">
            {passwordError}
            </div>
          )}
      <div>
      <button className="btn btn-success w-100" onClick={handleLogin}>Login</button>
      </div>
      <p className="text-center mt-2">
        Don't have an account? <Link to="/">Signup</Link>
      </p>
    </div>  
    </div>
  );
}
