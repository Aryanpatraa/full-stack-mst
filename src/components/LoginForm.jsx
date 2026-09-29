import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./LoginForm.css";

export default function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const result = login(username, password);

    if (!result.success) {
      setError(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="lock-icon">🔐</div>
          <h1>Welcome Back</h1>
          <p>Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="demo-credentials">
          <h4>Demo Credentials</h4>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>admin</code></td>
                <td><code>admin123</code></td>
                <td><span className="role-badge admin">Admin</span></td>
              </tr>
              <tr>
                <td><code>user</code></td>
                <td><code>user123</code></td>
                <td><span className="role-badge user">User</span></td>
              </tr>
              <tr>
                <td><code>manager</code></td>
                <td><code>manager123</code></td>
                <td><span className="role-badge manager">Manager</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
