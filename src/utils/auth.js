/**
 * Simulated User Database
 * 
 * In a real application, this would be a server-side database.
 * Each user has a userId, username, password, and role.
 */

const users = [
  {
    userId: 1,
    username: "admin",
    password: "admin123",
    role: "admin",
    fullName: "Administrator",
  },
  {
    userId: 2,
    username: "user",
    password: "user123",
    role: "user",
    fullName: "John Doe",
  },
  {
    userId: 3,
    username: "manager",
    password: "manager123",
    role: "manager",
    fullName: "Jane Smith",
  },
];

/**
 * Authenticate a user by username and password
 * @param {string} username
 * @param {string} password
 * @returns {Object|null} - User data (without password) or null
 */
export function authenticateUser(username, password) {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return null;

  // Return user data without the password
  const { password: _, ...userData } = user;
  return userData;
}
