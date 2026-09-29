# 🔐 Simple JWT Login System

A React-based login system demonstrating **Authentication**, **JWT Token Generation**, **Token Storage**, and **Protected UI** concepts.

Built with **React 19** + **Vite** for the Full Stack MST experiment.

---

## ✨ Features

- **Login Form** — Username and password fields with validation
- **Simulated JWT** — Token generated with header, payload (userId, role), and signature
- **Token Storage** — JWT stored in `localStorage` for session persistence
- **Protected Dashboard** — Only accessible after successful authentication
- **Role Display** — Shows user role (Admin / User / Manager) with permissions
- **Token Inspector** — View raw JWT and decoded payload on the dashboard
- **Session Persistence** — Stays logged in on page refresh (until token expires)

## 🧪 Demo Credentials

| Username  | Password     | Role    |
| --------- | ------------ | ------- |
| `admin`   | `admin123`   | Admin   |
| `user`    | `user123`    | User    |
| `manager` | `manager123` | Manager |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── LoginForm.jsx      # Login form UI
│   ├── LoginForm.css      # Login form styles
│   ├── Dashboard.jsx      # Protected dashboard UI
│   └── Dashboard.css      # Dashboard styles
├── context/
│   └── AuthContext.jsx     # Auth state management (React Context)
├── utils/
│   ├── jwt.js             # JWT generation, verification & storage
│   └── auth.js            # Simulated user database & authentication
├── App.jsx                # Root component with protected routing
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## 🔑 Key Concepts Demonstrated

### 1. Authentication Flow
```
User enters credentials → Validate against DB → Generate JWT → Store token → Show Dashboard
```

### 2. JWT Structure
```
header.payload.signature
```
- **Header**: Algorithm & token type (`HS256`, `JWT`)
- **Payload**: `userId`, `username`, `role`, `iat` (issued at), `exp` (expiry)
- **Signature**: Simulated HMAC hash of header + payload + secret

### 3. Token Storage
- Token stored in `localStorage` under key `auth_token`
- On page load, token is retrieved and verified
- Expired/invalid tokens are automatically cleared

### 4. Protected UI
- Dashboard component only renders when `isAuthenticated === true`
- `AuthContext` provides global auth state via React Context API
- Logout clears token from both state and storage

## 🛠️ Tech Stack

- **React 19** — UI library
- **Vite** — Build tool & dev server
- **CSS3** — Glassmorphism design with responsive layout

## 📝 License

MIT
