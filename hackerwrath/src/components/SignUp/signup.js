import React, { useState } from "react";
import "./signup.css";

const SignUp = () => {

   const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(${API_URL}/auth/register, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    console.log(data);
    alert(data.message || "Signup complete");
  };

  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              name="name" placeholder="Full Name" onChange={handleChange} required />

          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email" placeholder="Email" onChange={handleChange} required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password" name="password" placeholder="Password" onChange={handleChange} required />
        
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
        <p className="login-text">
            Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
