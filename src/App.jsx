import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

/**
 * AppContent handles the protected routing logic:
 * - If the user is authenticated → show Dashboard
 * - Otherwise → show LoginForm
 */
function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
          color: "#fff",
          fontSize: "1.2rem",
        }}
      >
        Loading...
      </div>
    );
  }

  // Protected UI: Dashboard is only shown when authenticated
  return isAuthenticated ? <Dashboard /> : <LoginForm />;
}

/**
 * App wraps everything in the AuthProvider so all children
 * can access authentication state via useAuth()
 */
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
