/**
 * Simulated JWT Utility
 * 
 * This module simulates JWT (JSON Web Token) creation, storage, and verification.
 * In a real application, tokens would be generated on the server using a library like jsonwebtoken.
 * 
 * JWT Structure: header.payload.signature (all base64-encoded)
 */

// Simulated secret key (in real apps, this is on the server only!)
const SECRET_KEY = "my-super-secret-key-2024";

/**
 * Base64 encode a string (browser-safe)
 */
function base64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Base64 decode a string (browser-safe)
 */
function base64Decode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return decodeURIComponent(escape(atob(str)));
}

/**
 * Create a simulated HMAC signature
 * (In production, use crypto libraries on the server)
 */
function createSignature(header, payload) {
  const data = `${header}.${payload}.${SECRET_KEY}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return base64Encode(hash.toString());
}

/**
 * Generate a simulated JWT token
 * @param {Object} payload - The token payload (userId, role, etc.)
 * @returns {string} - The JWT token string
 */
export function generateToken(payload) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const tokenPayload = {
    ...payload,
    iat: Date.now(),                          // Issued at
    exp: Date.now() + 60 * 60 * 1000,        // Expires in 1 hour
  };

  const encodedHeader = base64Encode(JSON.stringify(header));
  const encodedPayload = base64Encode(JSON.stringify(tokenPayload));
  const signature = createSignature(encodedHeader, encodedPayload);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Decode and verify a JWT token
 * @param {string} token - The JWT token string
 * @returns {Object|null} - Decoded payload or null if invalid/expired
 */
export function verifyToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;

    // Verify signature
    const expectedSignature = createSignature(encodedHeader, encodedPayload);
    if (signature !== expectedSignature) {
      console.warn("JWT: Invalid signature");
      return null;
    }

    // Decode payload
    const payload = JSON.parse(base64Decode(encodedPayload));

    // Check expiration
    if (payload.exp && payload.exp < Date.now()) {
      console.warn("JWT: Token expired");
      return null;
    }

    return payload;
  } catch (error) {
    console.error("JWT: Error verifying token", error);
    return null;
  }
}

/**
 * Decode a JWT token WITHOUT verification (for display purposes)
 * @param {string} token - The JWT token string
 * @returns {Object|null} - Decoded payload or null
 */
export function decodeToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(base64Decode(parts[1]));
  } catch {
    return null;
  }
}

// ─── Token Storage ─────────────────────────────────────────────

const TOKEN_KEY = "auth_token";

/**
 * Store token in localStorage
 */
export function storeToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Retrieve token from localStorage
 */
export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Remove token from localStorage
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
