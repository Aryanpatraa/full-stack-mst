import { useAuth } from "../context/AuthContext";
import { decodeToken } from "../utils/jwt";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, token, logout } = useAuth();

  // Decode the token to show its contents
  const decodedToken = token ? decodeToken(token) : null;

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "admin":
        return "badge-admin";
      case "manager":
        return "badge-manager";
      default:
        return "badge-user";
    }
  };

  const getRolePermissions = (role) => {
    switch (role) {
      case "admin":
        return [
          "View Dashboard",
          "Manage Users",
          "System Settings",
          "View Reports",
          "Full Access",
        ];
      case "manager":
        return [
          "View Dashboard",
          "View Reports",
          "Manage Team",
          "Approve Requests",
        ];
      default:
        return ["View Dashboard", "Edit Profile", "View Reports"];
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <span className="nav-icon">🛡️</span>
          <span>JWT Auth System</span>
        </div>
        <div className="nav-right">
          <span className="nav-user">
            Welcome, <strong>{user.fullName}</strong>
          </span>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-grid">
          {/* User Info Card */}
          <div className="card user-card">
            <div className="card-header">
              <h2>👤 User Profile</h2>
            </div>
            <div className="card-body">
              <div className="user-avatar">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <h3>{user.fullName}</h3>
              <p className="username">@{user.username}</p>
              <span className={`role-badge-lg ${getRoleBadgeClass(user.role)}`}>
                {user.role.toUpperCase()}
              </span>
              <div className="user-details">
                <div className="detail-row">
                  <span className="detail-label">User ID</span>
                  <span className="detail-value">{user.userId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Role</span>
                  <span className="detail-value">{user.role}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status</span>
                  <span className="detail-value status-active">● Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Permissions Card */}
          <div className="card permissions-card">
            <div className="card-header">
              <h2>🔑 Role Permissions</h2>
            </div>
            <div className="card-body">
              <ul className="permissions-list">
                {getRolePermissions(user.role).map((perm, index) => (
                  <li key={index}>
                    <span className="check-icon">✅</span>
                    {perm}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Token Info Card */}
          <div className="card token-card">
            <div className="card-header">
              <h2>🎫 JWT Token Details</h2>
            </div>
            <div className="card-body">
              <div className="token-section">
                <h4>Raw Token</h4>
                <div className="token-raw">
                  <code>{token}</code>
                </div>
              </div>

              {decodedToken && (
                <div className="token-section">
                  <h4>Decoded Payload</h4>
                  <pre className="token-decoded">
                    {JSON.stringify(decodedToken, null, 2)}
                  </pre>
                </div>
              )}

              <div className="token-section">
                <h4>Token Storage</h4>
                <p className="storage-info">
                  <span className="storage-icon">💾</span>
                  Stored in <code>localStorage</code> as{" "}
                  <code>auth_token</code>
                </p>
              </div>

              {decodedToken && (
                <div className="token-section">
                  <h4>Expiration</h4>
                  <p className="expiry-info">
                    <span className="clock-icon">⏰</span>
                    Expires at:{" "}
                    {new Date(decodedToken.exp).toLocaleTimeString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
