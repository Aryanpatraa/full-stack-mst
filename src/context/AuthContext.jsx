import { createContext, useContext, useState, useEffect } from "react";
import {
  generateToken,
  verifyToken,
  storeToken,
  getStoredToken,
  removeToken,
} from "../utils/jwt";
import { authenticateUser } from "../utils/auth";

const AuthContext = createContext(null);

/**
 * AuthProvider wraps the app and provides authentication state + methods
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for an existing token in localStorage
  useEffect(() => {
    const storedToken = getStoredToken();
    if (storedToken) {
      const payload = verifyToken(storedToken);
      if (payload) {
        setUser({
          userId: payload.userId,
          username: payload.username,
          role: payload.role,
          fullName: payload.fullName,
        });
        setToken(storedToken);
      } else {
        // Token is invalid or expired — clean up
        removeToken();
      }
    }
    setLoading(false);
  }, []);

  /**
   * Login with username and password
   * @returns {{ success: boolean, message: string }}
   */
  const login = (username, password) => {
    const userData = authenticateUser(username, password);

    if (!userData) {
      return { success: false, message: "Invalid username or password" };
    }

    // Generate a simulated JWT containing userId and role
    const jwt = generateToken({
      userId: userData.userId,
      username: userData.username,
      role: userData.role,
      fullName: userData.fullName,
    });

    // Store token in localStorage
    storeToken(jwt);

    // Update state
    setToken(jwt);
    setUser(userData);

    return { success: true, message: "Login successful!" };
  };

  /**
   * Logout — clear token and user state
   */
  const logout = () => {
    removeToken();
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to access auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
