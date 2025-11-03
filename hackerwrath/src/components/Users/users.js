import React, { useEffect, useState } from "react";
import "./users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCancelled = false;
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          "https://surgeless-mckenzie-moodier.ngrok-free.dev/api/auth/users"
        );
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message || "Failed to load users");
        }
        const data = await res.json();
        if (!isCancelled) setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!isCancelled) setError(err?.message || "Something went wrong");
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };
    fetchUsers();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="users-container">
      <div className="users-box">
        <h2 className="users-title">Users</h2>
        {error ? (
          <p className="error-text" style={{ color: "#e11d48", marginTop: "8px" }}>{error}</p>
        ) : null}
        {isLoading ? (
          <p>Loading users...</p>
        ) : (
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Coins</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}>No users found</td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.coins}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;


