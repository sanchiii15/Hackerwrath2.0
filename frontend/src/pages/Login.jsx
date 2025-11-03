import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
    
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    // Simulate login
    toast.success("Welcome back to CampusVerse! 🎮");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="modal-content w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="font-pixel text-retroYellow text-xl mb-2">
            🎮 LOGIN
          </h1>
          <p className="text-gray-400 text-xs">
            Welcome back to CampusVerse!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <button
            type="submit"
            className="retro-button w-full"
          >
            LOGIN
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs mb-2">
            Don't have an account?
          </p>
          <Link 
            to="/signup" 
            className="text-retroCyan hover:text-cyan-400 font-pixel text-xs"
          >
            CREATE ACCOUNT
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
