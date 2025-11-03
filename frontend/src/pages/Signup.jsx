import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    // Simulate signup
    toast.success("Welcome to CampusVerse! 🎮 Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="modal-content w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="font-pixel text-retroYellow text-xl mb-2">
            🎮 SIGN UP
          </h1>
          <p className="text-gray-400 text-xs">
            Join the CampusVerse community!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-retroYellow font-pixel text-xs mb-2">
              USERNAME
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username..."
              className="retro-input w-full"
            />
          </div>

          <div>
            <label className="block text-retroYellow font-pixel text-xs mb-2">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className="retro-input w-full"
            />
          </div>

          <div>
            <label className="block text-retroYellow font-pixel text-xs mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password..."
              className="retro-input w-full"
            />
          </div>

          <div>
            <label className="block text-retroYellow font-pixel text-xs mb-2">
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password..."
              className="retro-input w-full"
            />
          </div>

          <button
            type="submit"
            className="retro-button w-full"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs mb-2">
            Already have an account?
          </p>
          <Link 
            to="/login"
            className="text-retroCyan hover:text-cyan-400 font-pixel text-xs"
          >
            LOGIN HERE
          </Link>
        </div>

        <div className="text-center mt-6">
          <Link 
            to="/"
            className="text-retroPink hover:text-pink-400 font-pixel text-xs"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
