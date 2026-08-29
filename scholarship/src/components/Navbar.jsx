// scholarship/src/components/Navbar.jsx

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  const isAdmin = user?.role === "admin";

  function logout() {
    localStorage.removeItem("currentUser");
    navigate("/");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand" onClick={closeMenu}>
        🎓 ScholarPath
      </Link>

      <button
        type="button"
        className="mobile-menu-button"
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <nav className={menuOpen ? "open" : ""}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/scholarships" onClick={closeMenu}>Scholarships</NavLink>
        <NavLink to="/blogs" onClick={closeMenu}>Blog</NavLink>
        <NavLink to="/resources" onClick={closeMenu}>Resources</NavLink>
      </nav>

      <div className="nav-user">
        {user ? (
          <>
            <Link
              to={isAdmin ? "/admin" : "/profile"}
              className="profile-link"
              onClick={closeMenu}
            >
              {isAdmin ? "Admin Dashboard" : "My Profile"}
            </Link>
            <button className="nav-logout" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link className="login-link" to="/login" onClick={closeMenu}>
              Log in
            </Link>
            <Link className="profile-link signup-link" to="/register" onClick={closeMenu}>
              Join free
            </Link>
          </>
        )}
      </div>
    </header>
  );
}