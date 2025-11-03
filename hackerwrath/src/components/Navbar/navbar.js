import React, { useState, useEffect } from "react";
import "./navbar.css";
// import pixelAvatar from "../../../src/assets/pixel_avatar.jpeg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: "", id: "",  });

  // Generate random retro usernames
  const generateRetroUsername = () => {
    const prefixes = ["RETRO", "PIXEL", "CYBER", "NOSTALGIA", "VHS", "NEON"];
    const suffixes = ["RIDER", "GAMER", "NINJA", "BOT", "HERO", "STAR"];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${randomPrefix}_${randomSuffix}#${randomNum}`;
  };

  // Run only once when navbar loads
  useEffect(() => {
    const storedUsername = localStorage.getItem("retroUsername");
    if (storedUsername) {
      setUser((prev) => ({ ...prev, name: storedUsername }));
    } else {
      const newUsername = generateRetroUsername();
      localStorage.setItem("retroUsername", newUsername);
      setUser((prev) => ({ ...prev, name: newUsername }));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("retroUsername");
    window.location.href = "/"; // redirect to login page
  };

  return (
    <nav className="navbar">
      <h2 className="nav-logo">RetroConnect</h2>

      <div className="nav-links">
        <button>Complaints</button>
        <button>Help</button>
        <button>Create Post</button>
      </div>

      <div className="profile-section">
        <img
          src={user.avatar}
          alt="profile"
          className="profile-pic"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {menuOpen && (
          <div className="profile-menu">
            <p className="menu-username">👾 {user.name}</p>
            <hr />
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;