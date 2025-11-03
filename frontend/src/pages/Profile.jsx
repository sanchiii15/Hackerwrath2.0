import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cv_user");
    setUser(saved || "");
  }, []);

  return (
    <div className="p-6 font-pixel bg-black min-h-screen text-white">
      <h1 className="text-retroYellow text-xl">Profile 👤</h1>
      {user ? (
        <p className="mt-3 text-retroBlue">Welcome, {user}!</p>
      ) : (
        <p className="mt-3 text-red-400">Not logged in</p>
      )}
    </div>
  );
}
