import React, { useState } from "react";
import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../../config/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
    e.preventDefault();
		setError("");
		if (!email.trim() || !password.trim()) {
			setError("Please enter valid details!");
			return;
		}

		try {
			setIsLoading(true);
			const response = await apiFetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			if (!response.ok) {
				const errorBody = await response.json().catch(() => ({}));
				throw new Error(errorBody?.message || "Login failed. Please try again.");
			}

			const data = await response.json();
			if (data?.user) {
				try {
					localStorage.setItem("user", JSON.stringify(data.user));
				} catch (_) {
					// ignore storage errors
				}
				navigate("/home");
			} else {
				setError("Unexpected response from server.");
			}
		} catch (err) {
			setError(err?.message || "Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

					{error ? (
						<p className="error-text" style={{ color: "#e11d48", marginTop: "8px" }}>{error}</p>
					) : null}

					<button type="submit" className="login-btn" disabled={isLoading}>
						{isLoading ? "Logging in..." : "Login"}
					</button>
        </form>
        <p className="signup-text">
            Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
