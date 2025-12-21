import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Store token and username, then redirect
      localStorage.setItem("token", data.token);
      const username = (data && data.user && data.user.name) || "";
      if (username) localStorage.setItem("username", username);
      alert("Login Successful");
      window.location.href = "/";
    } catch (err) {
      setError("Error connecting to server: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome Back 🍽</h2>
        <p className="login-subtext">
          Login to plan meals, manage shopping lists, and discover recipes
          tailored to your dietary preferences.
        </p>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email address"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="login-footer">
          New user? <span>Create an account</span>
        </p>
        <p className="signup-link">
  Don’t have an account?{" "}
  <span onClick={() => (window.location.href = "/signup")}>
    Sign Up
  </span>
</p>

      </form>

    </div>
   

  );
}

export default Login;
